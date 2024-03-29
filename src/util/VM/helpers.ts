import INS from './instructionSet';
import Memory from './Memory';

export type Bit = 1 | 0;

/**
 * Converts integer to binary value
 */
export function toBin(
	intValue: number,
	allowBiggerThan8Bit: boolean = false,
	bitLength: number = 8
): string {
	if ((intValue > 255 && !allowBiggerThan8Bit) || intValue < 0)
		throw new Error('8 Bit Overflow');
	let bin = Math.abs(intValue).toString(2);
	let result;
	if (bin.length < bitLength) {
		result = Array(bitLength - bin.length + 1).join('0');
		result += bin;
	} else {
		result = bin;
	}

	return result;
}

/**
 * Converts integer to hex value
 */
export function toHex(
	intValue: number,
	allowBiggerThan8Bit: boolean = false
): string {
	if (intValue > 255 && !allowBiggerThan8Bit) throw new Error('8 Bit Overflow');
	return `${Math.abs(intValue).toString(16).toUpperCase()}`;
}

/**
 * Converts Binary Value to integer
 */
export function fromBin(binaryValue: string): number {
	binaryValue = binaryValue.replace(' ', '');
	return parseInt(binaryValue, 2);
}

/**
 * Converts Hex Value to integer
 */
export function fromHex(hexValue: string): number {
	hexValue = hexValue.replace(' ', '');
	return parseInt(hexValue, 16);
}

/**
 * Gets the instruction name of the given opocode
 * @param opcode The decimal opcode of the instruction
 * @returns The name of the related insruction
 */
export function getInstructionFromOpcode(opcode: number) {
	let instructionSet = INS as any;
	let keys = Object.keys(instructionSet);
	for (let i = 0; i < keys.length; i++) {
		if (typeof instructionSet[keys[i]] === 'object') {
			let values = Object.values(instructionSet[keys[i]]);
			if (values.includes(opcode)) return `${keys[i]}`;
		} else {
			if (instructionSet[keys[i]] === opcode) return `${keys[i]}`;
		}
	}

	return 'UNK';
}

/**
 * Gets the addressing mode of a given opcode with the base instruction
 * @param opcode Decimal Opcode of instruction
 * @param instruction Name of instruction
 * @returns Name of addressing mode
 */
export function getAddressingModeFromOpcode(
	opcode: number,
	instruction: string
) {
	let instructionSet = INS as any;
	let addressModes = instructionSet[instruction];
	if (typeof addressModes === 'number') return 'IMP';
	if (typeof addressModes === 'undefined') return 'UNK';
	let keys = Object.keys(addressModes);
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		if (addressModes[key] === opcode) return key;
	}

	return 'UNK';
}

export function calculateSigned8BitBinaryValue(value: number) {
	let bin = toBin(value);
	let subBin = bin.slice(1);
	if (bin[0] === '0') return fromBin(subBin);
	return -128 + fromBin(subBin);
}

export function addWithCarrydepc(A: number, value: number) {
	let Z = 0;
	let V = 0;
	let N = 0;
	let C = 0;

	let result = value + A + C;
	if (result === 0) Z = 1;
	if (result > 255) C = 1;
	if (toBin(result, true)[-7] === '1') N = 1;
	let signed1 = calculateSigned8BitBinaryValue(value);
	let signed2 = calculateSigned8BitBinaryValue(A);
	let signedResult = calculateSigned8BitBinaryValue(result);
	if (signed1 < 0 && signed2 < 0 && signedResult >= 0) V = 1;
	if (signed1 > 0 && signed2 > 0 && signedResult <= 0) V = 1;
	if (signed1 === 0 && signed2 === 0 && signedResult !== 0) V = 1;

	A = result;

	console.log(`A: ${A} \nV: ${V}\nZ: ${Z}\nN: ${N}\nC: ${C} `);
}

function bitAdd(bit1: any, bit2: any, carry: any) {
	let result = 0;
	let c = 0;

	result = bit1 + bit2 + carry;
	// console.log(result/)
	if (result > 1) {
		c = 1;
		if (result === 2) {
			result = 0;
		} else {
			result = 1;
		}
	}

	return { bit: result, carry: c };
}

export function byteAdd(byte1: string, byte2: string, startingCarry: 0 | 1) {
	let carry = startingCarry;
	let byte = '';
	for (let i = byte1.length - 1; i >= 0; i--) {
		let res = bitAdd(parseInt(byte1[i]), parseInt(byte2[i]), carry);
		byte = res.bit.toString() + byte;
		carry = res.carry as 0 | 1;
	}

	if (byte.length > 8) throw new Error('8 Bit Addition Overflow');
	return { byte, carry };
}

export function bitwiseNegate(value: number) {
	let binary = toBin(value);
	let result = '';
	for (let i = 0; i < binary.length; i++) {
		if (binary[i] === '1') result += '0';
		else if (binary[i] === '0') result += '1';
		else throw new Error('Non Binary Value');
	}

	return fromBin(result);
}

export function loadRAMFromFile(file: File, memory: Memory) {}
