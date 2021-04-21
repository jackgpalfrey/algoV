import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import ComputerInfoSection from '../../components/ComputerInfoSection/ComputerInfoSection';
import Input from '../../components/Input/Input';
import MemoryVisualiser, {
	dataFormats,
} from '../../components/MemoryVisualiser/MemoryVisualiser';
import RegisterVisualiser from '../../components/RegisterVisualiser/RegisterVisualiser';
import {
	getAddressingModeFromOpcode,
	getInstructionFromOpcode,
} from '../../util/VM/helpers';
import VM from '../../util/VM/VM';
import './style.css';

const ComputePage: React.FC = () => {
	const [speed, setSpeed] = useState(1000);
	const [isClockRunning, setIsClockRunning] = useState(false);

	const [Computer, setComputer] = useState(new VM(true));
	const [memPage, setMemPage] = useState(0);
	const [memArray, setMemArray] = useState([1]);
	const [memFormat, setMemFormat]: [dataFormats, Function] = useState('DEC');

	const [PC, setPC] = useState(0);
	const [SP, setSP] = useState(255);
	const [A, setA] = useState(0);
	const [X, setX] = useState(0);
	const [Y, setY] = useState(0);

	const [flags, setFlags] = useState({
		C: false, // Carry Flag
		Z: false, // Zero Flag
		I: false, // Interupt Disable Flag
		D: false, // Decimal Mode Flag
		B: false, // Break Flag
		Unused: true, // Unused Flag
		V: false, // Overflow Flag
		N: false, // Negative Flag
	});

	const [FDECycles, setFDECycles] = useState(0);
	const [clockCycles, setClockCycles] = useState(0);
	const [reads, setReads] = useState(0);
	const [writes, setWrites] = useState(0);

	const [latestEvent, setLatestEvent] = useState('N/A');

	let readsRef = useRef(reads);
	let writesRef = useRef(writes);

	useEffect(() => {
		// Computer.start()

		Computer.memoryMap.writeByte(65534, 11);
		Computer.memoryMap.writeByte(65535, 10);

		Computer.processor.loadProgram(
			['A9', '00', '18', '69', '08', 'C9', '18', 'D0', 'FA', 'A2', '14'],
			'HEX'
		);

		Computer.processor.on('setPC', (data) => {
			setPC(data.PC);
		});

		Computer.processor.on('setSP', (data) => {
			setSP(data.SP);
		});

		Computer.processor.on('setReg', (data) => {
			switch (data.register) {
				case 'A':
					setA(data.value);
					break;
				case 'X':
					setX(data.value);
					break;
				case 'Y':
					setY(data.value);
					break;
			}
		});

		Computer.processor.on('setFlag', (data) => {
			setFlags(data.flags);
		});

		Computer.memoryMap.on('WRITE', ({ address }) => {
			let startAddress = 256 * memPage;
			let endAddress = 256 * memPage + 256;
			if (address >= startAddress && address < endAddress) {
				setMemArray(Computer.memoryMap.readRegion(startAddress, endAddress));
			}
		});

		Computer.memoryMap.on('WRITE', () => {
			let cur = writesRef.current;
			setWrites(cur + 1);
			writesRef.current = cur + 1;
		});

		Computer.memoryMap.on('READ', () => {
			let cur = readsRef.current;
			setReads(cur + 1);
			readsRef.current = cur + 1;
		});

		Computer.processor.on('EXECUTIONSTART', ({ opcode }) => {
			let mnemonic = getInstructionFromOpcode(opcode);
			let addressingMode = getAddressingModeFromOpcode(opcode, mnemonic);
			setLatestEvent(`${opcode}: ${mnemonic} - ${addressingMode}`);
		});

		Computer.processor.on('EXECUTIONEND', () => {
			setFDECycles(Computer.processor.completedCycles);
			setClockCycles(Computer.processor.completedTicks);
		});

		Computer.processor.catch('loopDetected', () => {
			setIsClockRunning(false);
		});

		openPage(memPage);
	}, []);

	function startClock() {
		setIsClockRunning(true);
		Computer.start();
	}
	function stopClock() {
		setIsClockRunning(false);
		Computer.clock.stopLoop();
	}
	function stepClock() {
		Computer.clock.step();
	}

	function setClock(val: number) {
		Computer.clock.delay = val;
	}

	function openPage(page = memPage) {
		let startAddress = 256 * page;
		let endAddress = 256 * page + 256;
		setMemArray(Computer.memoryMap.readRegion(startAddress, endAddress));
	}

	function setMemAddress(idx: number, newValue: number) {
		Computer.memoryMap.writeByte(idx, newValue, true, true, false);
		openPage();
	}

	return (
		<div className='compute-outerContainer'>
			<div className='compute-innerContainer'>
				<div className='compute-headerMenu'>
					<div className='computer-header-container'>
						<Button
							text='Step'
							variant='outline'
							theme='dark'
							color='#1B9BE2'
							textColor='#1B9BE2'
							onClick={stepClock}
						/>
						<Input
							value={speed.toString()}
							variant='outline'
							theme='dark'
							color='#1B9BE2'
							textColor='white'
							onChange={(e) => {
								let val = parseInt(e.target.value);
								if (!val) val = 0;
								setSpeed(val);
								setClock(val);
							}}
							id='input'
							label='Delay (m/s)'
						/>
						<Button
							text={isClockRunning ? 'Stop' : 'Start'}
							variant='outline'
							theme='dark'
							color='#1B9BE2'
							textColor='#1B9BE2'
							onClick={isClockRunning ? stopClock : startClock}
						/>
						<Button
							text='Reset'
							variant='outline'
							theme='dark'
							color='#1B9BE2'
							textColor='#1B9BE2'
							onClick={() => {
								window.location.reload();
							}}
						/>

						<ComputerInfoSection
							name='FDE Cycles'
							value={FDECycles.toString()}
							margin='1em'
						/>
						<ComputerInfoSection
							name='Clock Cycles'
							value={clockCycles.toString()}
							margin='1em'
						/>
						<div style={{ margin: '2em' }} />
						<ComputerInfoSection
							name='Reads'
							value={reads.toString()}
							margin='1em'
						/>
						<ComputerInfoSection
							name='Writes'
							value={writes.toString()}
							margin='1em'
						/>
						<div style={{ margin: '2em' }} />
						<ComputerInfoSection
							name='Latest Instruction'
							value={latestEvent.toString()}
							margin='1em'
						/>
					</div>
				</div>
				<div className='compute-memoryVisualiser'>
					<MemoryVisualiser
						PC={PC}
						memory={memArray}
						page={memPage}
						format={memFormat}
						onChangePage={(newVal) => {
							if (newVal >= 0 && newVal < 255) {
								setMemPage(newVal);
								openPage(newVal);
							}
						}}
						onPageDown={() => {
							let newVal = memPage - 1;
							if (newVal >= 0 && newVal < 255) {
								setMemPage(newVal);
								openPage(newVal);
							}
						}}
						onPageUp={() => {
							let newVal = memPage + 1;
							if (newVal >= 0 && newVal < 255) {
								setMemPage(newVal);
								openPage(newVal);
							}
						}}
						onSelectFormat={(format) => {
							setMemFormat(format);
						}}
						onChangeMemory={(idx, val) => setMemAddress(idx, val)}
					/>
				</div>
				<div className='compute-registerVisualiser'>
					<RegisterVisualiser PC={PC} SP={SP} A={A} X={X} Y={Y} Flags={flags} />
				</div>
				<div className='compute-editor'></div>
			</div>
		</div>
	);
};

export default ComputePage;
