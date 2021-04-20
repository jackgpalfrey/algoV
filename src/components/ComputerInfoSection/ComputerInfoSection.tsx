import React from 'react';
import './style.css';

interface ComputerInfoSectionProps {
	name: string;
	value: string;
	margin?: string;
}

const ComputerInfoSection: React.FC<ComputerInfoSectionProps> = ({
	margin,
	name,
	value,
}) => {
	return (
		<div style={{ margin: `0 ${margin}` }} className='computer-infoSection'>
			<h3 className='computer-infoSection-title'>{name}:</h3>
			<p className='computer-infoSection-data'>{value}</p>
		</div>
	);
};

export default ComputerInfoSection;
