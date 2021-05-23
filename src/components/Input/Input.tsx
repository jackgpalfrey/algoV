import React, { ChangeEventHandler } from 'react';
import './style.css';

interface ButtonProps {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	color?: string;
	theme?: 'dark' | 'light';
	variant?: 'full' | 'outline';
	textColor: string;
	label?: string;
	id: string;
}

const Input: React.FC<ButtonProps> = ({
	value = '',
	id,
	onChange,
	color = '',
	theme = 'light',
	textColor = `${theme === 'light' ? 'black' : 'white'}`,
	label,
}) => {
	const isLabelVisible = !!label;
	return (
		<div className='input-container'>
			<label
				htmlFor={id}
				style={{ color, display: `${isLabelVisible ? 'block' : 'none'}` }}>
				{label}
			</label>
			<input
				id={id}
				onChange={onChange}
				value={value}
				style={{
					backgroundColor: `transparent`,
					border: `.3em solid ${color}`,
					color: textColor,
				}}
				className={`input-${theme}Theme`}></input>
		</div>
	);
};

export default Input;
