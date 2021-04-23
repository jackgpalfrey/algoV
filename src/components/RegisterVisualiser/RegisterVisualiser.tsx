import { stringify } from 'querystring';
import React from 'react';
import { Flags, Registers } from '../../util/VM/CPU';
import './style.css';

type allRegisters = 'PC' | 'SP' | 'A' | 'X' | 'Y';
interface RegisterVisualiserProps {
	PC: number;
	SP: number;
	A: number;
	X: number;
	Y: number;
	Flags: Flags;
	onChangeRegister: any; //(registerName: allRegisters, newVal: number) => void;
	setFlagsFunction: Function;
}

const RegisterVisualiser: React.FC<RegisterVisualiserProps> = ({
	PC,
	SP,
	A,
	X,
	Y,
	Flags,
	onChangeRegister,
	setFlagsFunction,
}) => {
	function RegisterChangeHandler(register: allRegisters, newVal: string) {
		let val = parseInt(newVal);
		if (newVal === '') val = 0;
		if (val === NaN) return;
		if (register === 'PC') {
			if (val >= 0 && val <= 65536) onChangeRegister(register, val);
		} else {
			if (val >= 0 && val <= 255) onChangeRegister(register, val);
		}
	}

	function flagClickHandler(flag: keyof Flags) {
		let newFlags = { ...Flags };
		newFlags[flag] = !newFlags[flag];
		setFlagsFunction(newFlags);
	}

	return (
		<div className='compute-memoryVisualiser-container'>
			<div className='compute-memoryVisualiser-innerContainer'>
				<div className='compute-registerVisualiser-menu'>
					<h2>Registers: </h2>
					<div></div>
					<h2>Flags: </h2>
				</div>
				<div className='compute-memoryVisualiser-body'>
					<div className='compute-registerVisualiser-body-container'>
						<div className='compute-registerVisualiser-body-section compute-registerVisualiser-body-registers'>
							<p>Program Counter</p>
							<input
								onChange={(e) => RegisterChangeHandler('PC', e.target.value)}
								value={PC}
								className='PCReg'></input>

							<p>Stack Pointer</p>
							<input
								onChange={(e) => RegisterChangeHandler('SP', e.target.value)}
								value={SP}></input>

							<p>Accumulator</p>
							<input
								onChange={(e) => RegisterChangeHandler('A', e.target.value)}
								value={A}></input>

							<p>X Register</p>
							<input
								onChange={(e) => RegisterChangeHandler('X', e.target.value)}
								value={X}></input>

							<p>Y Register</p>
							<input
								onChange={(e) => RegisterChangeHandler('Y', e.target.value)}
								value={Y}></input>
						</div>
						<div className='compute-registerVisualiser-body-section compute-registerVisualiser-body-flags'>
							<p>Carry Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('C');
								}}>
								{Flags.C ? '1' : '0'}
							</p>

							<p>Zero Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('Z');
								}}>
								{Flags.Z ? '1' : '0'}
							</p>

							<p>Interupt Disable Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('I');
								}}>
								{Flags.I ? '1' : '0'}
							</p>

							<p>Decimal Mode Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('D');
								}}>
								{Flags.D ? '1' : '0'}
							</p>

							<p>Break Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('B');
								}}>
								{Flags.B ? '1' : '0'}
							</p>

							<p>Overflow Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('V');
								}}>
								{Flags.V ? '1' : '0'}
							</p>

							<p>Negative Flag</p>
							<p
								className='compute-registerVisualiser-body-flags-value'
								onClick={() => {
									flagClickHandler('N');
								}}>
								{Flags.N ? '1' : '0'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterVisualiser;
