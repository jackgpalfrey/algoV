import EventEmitter from './EventEmitter';
import Memory from './Memory';

class MemoryMapper extends EventEmitter {
	public memory: any;
	private dataPins: number;
	private addressPins: any;

	constructor(dataPins: number, addressPins: number) {
		super();
		this.dataPins = dataPins;
		this.addressPins = addressPins;

		this.memory = {};
	}

	/**
	 * Mounts given memory to memory map.
	 * @param memory A instance of memory to mount to map
	 * @returns The upper address and reference of memory
	 */
	public mount(memory: Memory): number {
		// Validates memory
		if (memory.dataSize !== this.dataPins)
			throw new Error('Cannot Mount Memory (Incompatible data transfer)');

		// Gets Current Memory
		let currentMap = this.memory;
		let currentLocations = Object.keys(currentMap);

		// Gets Highest mounted address
		let startAddress = 0;
		if (currentLocations.length !== 0) {
			startAddress = parseInt(currentLocations[currentLocations.length - 1]);
		}

		// Gets End Address
		let endAddress = startAddress + memory.addressSpaceSize - 1;
		if (endAddress > 2 ** this.addressPins) {
			let error = new Error('Address Too Large');
			throw error;
		}

		// Adds to memory map
		this.memory[endAddress] = memory;

		return endAddress; // Returns reference to memory
	}

	/**
	 * Checks if given data is valid
	 * @param data Data to check is permissable data
	 * @returns true if value is permissable and false if not
	 */
	public isValidData(data: number): boolean {
		return typeof data === 'number' && data < 2 ** this.dataPins && data >= 0;
	}

	/**
	 * Gets the partition of requested address
	 * @param address Decimal address of requested memory location
	 * @returns [Starting address of partition, Final Address and reference of partition]
	 */
	private getPartitionOfAddress(address: number): [string, string] {
		// Gets All Partitions
		let partitionAddresses = Object.keys(this.memory);

		// Loops through all partitions and finds one the address is in
		let lastAddress = -1;
		for (let i = 0; i < partitionAddresses.length; i++) {
			let partitionAddress = parseInt(partitionAddresses[i]);
			if (lastAddress !== -1) partitionAddress += 1;

			if (address <= partitionAddress && address > lastAddress) {
				return [partitionAddresses[i - 1] || '0', partitionAddresses[i]];
			}

			lastAddress = parseInt(partitionAddresses[i]);
		}

		// If Partition doesn't exist at given address, errors
		throw new Error(`No Memory At Location ${address}`);
	}

	/**
	 * Reads given memory address and returns value
	 * @param address The Address to read from
	 * @param errorOnInvalidAddress Should program crash with error if address does not exist
	 * @returns Decimal value at memory address
	 */
	public readByte(
		address: number,
		errorOnInvalidAddress: boolean = true,
		useRead = true
	): number {
		// Gets start and end address of host partition
		let startAddress;
		let endAddress;
		try {
			[startAddress, endAddress] = this.getPartitionOfAddress(address);
		} catch (err) {
			if (errorOnInvalidAddress) throw err;
			return 0;
		}

		// Gets reference to host memory
		let mem: Memory = this.memory[endAddress];

		// Gets address to read memory with by localising index to specific memory
		let readAddress: number = address - parseInt(startAddress);
		if (startAddress !== '0') readAddress -= 1;

		if (useRead) this.emitEvent('READ');
		console.log('READ');

		return mem.readByte(readAddress);
	}

	/**
	 * Writes Value to given memory address
	 * @param address The address to write to
	 * @param newValue The decimal value to write to given memory address
	 * @param errorOnUnwriteable Should program crash with error if partition is unwriteable
	 * @param errorOnInvalidAddress Should program crash with error if address does not exist
	 * @returns Value at given address (Used to check if write was succesful)
	 */
	public writeByte(
		address: number,
		newValue: number,
		errorOnUnwriteable: boolean = true,
		errorOnInvalidAddress: boolean = true
	): number | undefined {
		// Checks if given new value is valid ie represenatble in 8 bits and numberic
		if (!this.isValidData(newValue)) throw new Error('Invalid Data');

		// Gets host partition
		let startAddress;
		let endAddress;
		try {
			[startAddress, endAddress] = this.getPartitionOfAddress(address);
		} catch (err) {
			if (errorOnInvalidAddress) throw err;
			return;
		}

		// Gets memory partition
		let mem: Memory = this.memory[endAddress];

		// Localises index to host partition
		let writeAddress: number = address - parseInt(startAddress);
		if (startAddress !== '0') writeAddress -= 1;

		try {
			return mem.writeByte(writeAddress, newValue);
		} catch {
			if (errorOnUnwriteable) throw new Error("Couldn't Write");
		} finally {
			this.emitEvent('WRITE', { address });
		}
	}

	public readRegion(startAddress: number, endAddress: number) {
		let array = [];
		for (let i = startAddress; i < endAddress; i++) {
			array.push(this.readByte(i, false, false));
		}

		return array;
	}
}

export default MemoryMapper;
