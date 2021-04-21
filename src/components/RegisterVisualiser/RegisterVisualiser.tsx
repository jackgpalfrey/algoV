import React from 'react';
import { Flags, Registers } from '../../util/VM/CPU';
import './style.css';

interface RegisterVisualiserProps {
	PC: number;
	SP: number;
	A: number;
	X: number;
	Y: number;
	Flags: Flags;
}

const RegisterVisualiser: React.FC<RegisterVisualiserProps> = ({
	PC,
	SP,
	A,
	X,
	Y,
	Flags,
}) => {
	return (
		<div className='compute-memoryVisualiser-container'>
			<div className='compute-memoryVisualiser-innerContainer'>
				<div className='compute-registerVisualiser-menu'>
					<h2>Registers: </h2>
					<h2>Flags: </h2>
				</div>
				<div className='compute-memoryVisualiser-body'>
					<div className='compute-registerVisualiser-body-container'>
						<div className='compute-registerVisualiser-body-section compute-registerVisualiser-body-registers'>
							<p>Program Counter</p>
							<p>{PC}</p>

							<p>Stack Pointer</p>
							<p>{SP}</p>

							<p>Accumulator</p>
							<p>{A}</p>

							<p>X Register</p>
							<p>{X}</p>

							<p>Y Register</p>
							<p>{Y}</p>
						</div>
						<div className='compute-registerVisualiser-body-section compute-registerVisualiser-body-flags'>
							<p>Carry Flag</p>
							<p>{Flags.C ? '1' : '0'}</p>

							<p>Zero Flag</p>
							<p>{Flags.Z ? '1' : '0'}</p>

							<p>Interupt Disable Flag</p>
							<p>{Flags.I ? '1' : '0'}</p>

							<p>Decimal Mode Flag</p>
							<p>{Flags.D ? '1' : '0'}</p>

							<p>Break Flag</p>
							<p>{Flags.B ? '1' : '0'}</p>

							<p>Overflow Flag</p>
							<p>{Flags.V ? '1' : '0'}</p>

							<p>Negative Flag</p>
							<p>{Flags.N ? '1' : '0'}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterVisualiser;
