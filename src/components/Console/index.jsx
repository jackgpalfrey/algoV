import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import getLocaleText from '../../util/getLocaleText';
const text = getLocaleText('general').console;

function Console(props) {
	const [isOpen, setIsOpen] = useState(props.display);
	const [textColor, setTextColor] = useState('white');
	const [commandText, setCommandText] = useState('');
	const [responseText, setResponseText] = useState('');

	useEffect(() => {
		setIsOpen(props.display);
	}, [props.display]);

	function responseHandler(response) {
		response[0] === 'ERROR' ? setTextColor('red') : setTextColor('green');
		setResponseText(`${response[1]}`);
		setTimeout(() => {
			setResponseText('');
		}, 1000);
		console.log(response[1]);
	}

	function handleConsole(e) {
		if (e.key !== 'Enter') return;
		let command = commandText.replaceAll("'", '"');
		command = commandText.replaceAll('(', '[').replaceAll(')', ']');
		console.log(`Command: ${command}`);
		try {
			let jsonCommand = JSON.parse(command);
			let response = props.AnimateEngine(jsonCommand);
			responseHandler(response);
		} catch (error) {
			console.log(error);
			responseHandler(['ERROR', 'Invalid Syntax']);
		}
	}

	function consoleChangeHandler(e) {
		if (e.target.value.includes('cls')) {
			setCommandText('');
		} else {
			setCommandText(e.target.value);
		}

		setTextColor('white');
	}

	let terminal = (
		<div className='consoleBox'>
			<div className='consoleLine'>
				<input
					placeholder={text.placeholder}
					value={commandText}
					onChange={consoleChangeHandler}
					style={{ color: textColor }}
					className='console'
					onKeyDown={handleConsole}
				></input>
				{isOpen ? (
					<Link title={text.openDocs} to={`/docs?${props.docsKey || ''}`}>
						{' '}
						<i className='material-icons docsButton clickable'>
							description
						</i>{' '}
					</Link>
				) : null}
			</div>
			<p style={{ color: textColor }}>{responseText}</p>
		</div>
	);

	return <div>{isOpen ? terminal : null}</div>;
}

export default Console;
