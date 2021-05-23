import Clock from './Clock';
import CPU from './CPU';
import EventEmitter from './EventEmitter';
import {
	getAddressingModeFromOpcode,
	getInstructionFromOpcode,
	toHex,
} from './helpers';
import Memory from './Memory';
import MemoryMapper from './MemoryMapper';

class VM extends EventEmitter {
	public processor: CPU;
	public RAM: Memory;
	public memoryMap: MemoryMapper;
	public clock: Clock;

	constructor(isDevModeActive: boolean = false) {
		super();
		this.memoryMap = new MemoryMapper(8, 16);
		this.processor = new CPU(this, { cycleSpeed: 1000 });
		this.RAM = new Memory(8, 65536);
		this.memoryMap.mount(this.RAM);

		this.clock = new Clock();

		this.createRequiredEventListeners();

		if (isDevModeActive) this.createLogger();
	}

	private createLogger() {
		this.processor.on('START', () => {
			console.log('\n\n\n\n\n\n');
			console.log('CPU Started');
		});

		this.processor.on('LOG', (data) => {
			console.log(data);
		});

		this.processor.catch('', (data) => {
			console.error(`${data.name}: ${data.message}`);
		});

		this.processor.catch('invalidInstruction', (data) => {
			this.clock.stopLoop();
		});

		this.processor.catch('loopDetected', (data) => {
			this.clock.stopLoop();
		});

		this.processor.on(
			'EXECUTIONSTART',
			(data: { opcode: number; mnemonic: string; addressingMode: string }) => {
				data.mnemonic = getInstructionFromOpcode(data.opcode);
				data.addressingMode = getAddressingModeFromOpcode(
					data.opcode,
					data.mnemonic
				);

				console.groupCollapsed(
					`Cycle: ${this.processor.completedCycles} \nInstruction: ${toHex(
						data.opcode
					)} (${data.mnemonic}  -  ${
						data.addressingMode
					}) \nPC: ${this.processor.getPC()} (${toHex(
						this.processor.getPC(),
						true
					)})`
				);
				console.group('―――――――――――――――――< Logs >―――――――――――――――――');
			}
		);

		this.processor.on('EXECUTIONEND', () => {
			this.logStatus();
			console.groupEnd();
			console.groupEnd();
		});
	}

	private logStatus() {
		console.groupEnd();
		console.group('―――――――――――――< System State >―――――――――――――');
		console.groupCollapsed('Registers:');
		console.log(`PC: ${this.processor.PC}`);
		console.log(`SP: ${this.processor.SP}`);
		let registers = Object.keys(this.processor.registers);
		let regObj = this.processor.registers as any;
		for (let i = 0; i < registers.length; i++) {
			let reg = registers[i] as any;
			console.log(`${reg}: ${regObj[reg]}`);
		}
		console.groupEnd();

		console.groupCollapsed(`Flags: (${this.processor.getFlagByte()})`);
		let flags = Object.keys(this.processor.flags);
		let flagObj = this.processor.flags as any;
		for (let i = 0; i < flags.length; i++) {
			let flag = flags[i] as any;
			if (flag === 'Unused') continue;
			console.log(
				`%c ${flag}: ${flagObj[flag]}`,
				`color:${flagObj[flag] ? 'green' : 'red'}`
			);
		}
		console.groupEnd();

		console.groupCollapsed('Zero Page:');
		console.log(this.processor.memory.memory['65535'].readRegion(0, 256));
		console.groupEnd();

		console.groupCollapsed('Stack: (Reversed)');
		console.log(
			this.processor.memory.memory['65535'].readRegion(256, 512).reverse()
		);
		console.groupEnd();

		console.groupCollapsed('Rest of RAM:');
		console.log(this.processor.memory.memory['65535'].data);
		console.groupEnd();
	}

	public start() {
		this.clock.startLoop();
	}

	private createRequiredEventListeners() {
		this.clock.on('step', ({ completeCycle }) => {
			this.processor.FDE();
		});
	}
}

export default VM;
