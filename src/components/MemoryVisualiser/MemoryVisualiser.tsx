import React from 'react';
import {
	calculateSigned8BitBinaryValue,
	toBin,
	toHex,
	fromHex,
	fromBin,
} from '../../util/VM/helpers';
import './style.css';

export type dataFormats = 'DEC' | 'DECS' | 'HEX';

interface MemoryVisualiserProps {
	memory: number[];
	page: number;
	format: dataFormats;
	onPageDown: React.MouseEventHandler<HTMLButtonElement>;
	onPageUp: React.MouseEventHandler<HTMLButtonElement>;
	onChangePage: (newPage: number) => void;
	onSelectFormat: (format: dataFormats) => void;
	PC: number;
	onChangeMemory: (address: number, newValue: number) => void;
}

const MemoryVisualiser: React.FC<MemoryVisualiserProps> = ({
	memory,
	page,
	format,
	PC,
	onPageDown,
	onPageUp,
	onChangePage,
	onSelectFormat,
	onChangeMemory,
}) => {
	function handleChangePage(e: any) {
		let val = e.target.value;
		let intVal = parseInt(e.target.value);
		if (val === '') intVal = 0;
		if (intVal === NaN) return;
		onChangePage(intVal);
	}

	function getValue(pageRelativeIndex: number) {
		return memory[pageRelativeIndex];
	}

	function onMemoryChange(pageRelativeIndex: number, newValue: string) {
		let idx = getAddressFromRelativeIndex(pageRelativeIndex);
		if (newValue === '') return onChangeMemory(idx, 0);
		let value = convertSelectedFormatToDecimal(newValue);
		if (value < 255 && value > 0) onChangeMemory(idx, value);
	}

	function renderMemory() {
		return memory.map((val, idx) => {
			const isCurrentPCAddress = getAddressFromRelativeIndex(idx) === PC;
			return (
				<input
					className={`compute-memoryVisualiser-body-input ${
						isCurrentPCAddress ? 'currentPC' : ''
					}`}
					disabled={format === 'DECS'}
					value={convertDecimalToSelectedFormat(val)}
					onChange={(e) => onMemoryChange(idx, e.target.value)}></input>
			);
		});

		// DIV VERSION
		return memory.map((val, idx) => {
			const isCurrentPCAddress = getAddressFromRelativeIndex(idx) === PC;
			return (
				<div
					className={`compute-memoryVisualiser-body-node ${
						isCurrentPCAddress ? 'currentPC' : ''
					}`}>
					{convertDecimalToSelectedFormat(val)}
				</div>
			);
		});
	}

	function convertDecimalToSelectedFormat(val: number) {
		switch (format) {
			case 'DEC':
				return val;
			case 'DECS':
				return calculateSigned8BitBinaryValue(val);
			case 'HEX':
				return toHex(val);
		}
	}

	function convertSelectedFormatToDecimal(val: string): number {
		switch (format) {
			case 'DEC':
				return parseInt(val);
			case 'DECS':
				let decVal = parseInt(val);
				console.log(decVal);
				if (decVal < 0) {
					let newVal = decVal - 255;
					console.log(newVal);
					return newVal;
				}

				return decVal;

			case 'HEX':
				return fromHex(val);
		}
	}

	function getAddressFromRelativeIndex(index: number) {
		return index + page * 256;
	}

	return (
		<div className='compute-memoryVisualiser-container'>
			<div className='compute-memoryVisualiser-innerContainer'>
				<div className='compute-memoryVisualiser-menu'>
					<div className='compute-memoryVisualiser-menu-formatSelector'>
						Memory Format:
						<div className='compute-memoryVisualiser-menu-formatSelector-items'>
							<button
								onClick={() => {
									onSelectFormat('DEC');
								}}
								className={format === 'DEC' ? 'selected' : ''}>
								Decimal
							</button>
							<button
								onClick={() => {
									onSelectFormat('DECS');
								}}
								className={format === 'DECS' ? 'selected' : ''}>
								Decimal S
							</button>
							<button
								onClick={() => {
									onSelectFormat('HEX');
								}}
								className={format === 'HEX' ? 'selected' : ''}>
								Hex
							</button>
						</div>
					</div>

					<div className='compute-memoryVisualiser-menu-pageSelector'>
						Page:
						<div className='compute-memoryVisualiser-menu-formatSelector-items'>
							<button onClick={onPageDown}>{'<'}</button>
							<input
								onChange={handleChangePage}
								value={page.toString()}></input>
							<button onClick={onPageUp}>{'>'}</button>
						</div>
					</div>
				</div>
				<div className='compute-memoryVisualiser-body'>
					<div className='compute-memoryVisualiser-body-container'>
						{renderMemory()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemoryVisualiser;
