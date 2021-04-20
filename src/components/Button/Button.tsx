import React, { MouseEventHandler } from 'react';
import './style.css';

interface ButtonProps {
	text: string;
	color?: string;
	theme?: 'dark' | 'light';
	variant?: 'full' | 'outline';
	textColor: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
	text,
	color = '',
	theme = 'light',
	variant = 'full',
	textColor = `${theme === 'light' ? 'black' : 'white'}`,
	onClick,
}) => {
	const isFullVariant = variant === 'full';
	return (
		<div className='button-container'>
			<button
				onClick={!!onClick ? onClick : () => {}}
				style={{
					backgroundColor: `${isFullVariant ? color : 'transparent'}`,
					border: `${!isFullVariant ? `.3em solid ${color}` : 'transparent'}`,
					color: textColor,
				}}
				className={`button-${theme}Theme button-${variant}Variant`}>
				{text}
			</button>
		</div>
	);
};

export default Button;
