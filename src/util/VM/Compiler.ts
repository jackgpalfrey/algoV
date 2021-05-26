import { fromBin, fromHex, toBin } from './helpers';

export function LMC(instructionSet: string): number[] {
	const instructionLines = instructionSet.split('\n');
	let variables = {};
	let RAMArray: any[] = [];

	for (let line of instructionLines) {
		line = line.trim();
		const lineArray = line.split(' ');
		if (lineArray[0] === 'DAT') {
			const name = lineArray[1];
			const value = parseInt(lineArray[2]);
			setVariable(variables, name, value);
			continue;
		}
		const command = LMCGetMachineCodeFromMnemonic(lineArray[0]);
		RAMArray.push(command);
		const address = parseInt(lineArray[1]);
		const LittleEndianAddress = getLittleEndianArray(address);
		LittleEndianAddress.forEach((value) => {
			RAMArray.push(value);
		});
	}

	return LMCVariableCompile(variables, RAMArray);
}

function interpretVariables(variableObject: any, variableName: any) {
	if (!isNaN(variableName)) return parseInt(variableName);
	if (!variableObject[variableName]) return 0;
	let val = variableObject[variableName];
	return parseInt(val);
}

function setVariable(variableObject: any, variableName: any, value: number) {
	if (!isNaN(variableName)) return;
	variableObject[variableName] = value;
}

function LMCVariableCompile(variableObject: any, RAMArray: any[]): number[] {
	const finalPosition = RAMArray.length;
	const variableNameArray = Object.keys(variableObject);
	for (let i = 0; i < RAMArray.length; i++) {
		const idx = variableNameArray.indexOf(RAMArray[i]);
		console.log(RAMArray[i]);
		if (idx === -1) continue;
		console.log(idx);
		RAMArray[i] = getLittleEndianArray(finalPosition + i);
	}

	variableNameArray.forEach((value) => {
		RAMArray.push(variableObject[value]);
	});

	return RAMArray.flat();
}

function LMCGetMachineCodeFromMnemonic(mnemonic: string) {
	let formattedMnemonic = mnemonic.toUpperCase().trim();
	console.log(formattedMnemonic);
	switch (formattedMnemonic) {
		case 'LDA':
			return fromHex('AD');
		case 'STA':
			return fromHex('8D');
		case 'ADD':
			return fromHex('6D');
		case 'SUB':
			return fromHex('ED');
		case 'HLT':
			return fromHex('00');
		case 'BRZ':
			return fromHex('Fo');
		case 'BRP':
			return fromHex('10');
		case 'BRA':
			return fromHex('4C');
		default:
			return -1;
	}
}

function getLittleEndianArray(address: number) {
	let binary = toBin(address, true, 16);
	let LoByte = binary.slice(8);
	let HiByte = binary.slice(0, 8);
	return [fromBin(LoByte), fromBin(HiByte)];
}
