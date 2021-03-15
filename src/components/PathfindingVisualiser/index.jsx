import React, { useEffect, useState } from 'react';
import './style.css';
import Console from '../Console';

import getLocaleText from '../../util/getLocaleText';
const consoleText = getLocaleText('general').console;
const text = getLocaleText('general').bars;
const algoData = getLocaleText('algorithmInfo');

function PathfindingVisualiser() {
	const [grid, setGrid] = useState();
	const [mouseDown, setMouseDown] = useState(0);
	const [penColor, setPenColor] = useState('red');
	const [penType, setPenType] = useState('wall');
	const [isTerminalOpen, setIsTerminalOpen] = useState(true);

	useEffect(() => {
		createGrid();
	}, []);

	function AnimateEngine() {
		return;
	}

	function handleMouseDown(x, y, type) {
		setGrid((prevState) => {
			let toType = penType;
			let toColor = penColor;

			if (mouseDown === 2 || type === 'eraser') {
				console.log('RIGHT');
				toType = 'none';
				toColor = 'transparent';
			}

			let prevGrid = prevState.slice();
			prevGrid[y][x].color = toColor;
			prevGrid[y][x].type = toType;
			return prevGrid;
		});
	}

	function createGrid() {
		const NUM_OF_BARS_Y = 30;
		const NUM_OF_BARS_X = 50;
		let yAxis = [];
		for (let yPos = 0; yPos < NUM_OF_BARS_Y; yPos++) {
			let xAxis = [];
			for (let xPos = 0; xPos < NUM_OF_BARS_X; xPos++) {
				xAxis.push({
					x: xPos,
					y: yPos,
					color: 'transparent',
					type: 'none',
				});
			}
			yAxis.push(xAxis);
		}
		setGrid(yAxis);
	}

	function renderGrid(array) {
		if (!array) return;
		let yDivs = array.map((xAxis) => {
			let xDivs = xAxis.map((val) => {
				return (
					<div
						onMouseEnter={() => {
							if (mouseDown < 1) return;
							handleMouseDown(val.x, val.y);
						}}
						onMouseDown={(e) => {
							if (e.button === 2)
								return handleMouseDown(val.x, val.y, 'eraser');
							handleMouseDown(val.x, val.y);
						}}
						className={`grid-xAxis-Divs node-type-${val.type}`}
						style={{ backgroundColor: `${val.color}` }}
					></div>
				);
			});
			return <div className='grid-yAxis-Divs'>{xDivs}</div>;
		});
		return <div>{yDivs}</div>;
	}

	return (
		<div
			className='grid-container'
			onMouseDown={(e) => {
				console.log(e.button);
				if (e.button === 0) {
					setMouseDown(1);
				} else {
					setMouseDown(2);
				}
			}}
			onMouseUp={() => {
				setMouseDown(0);
			}}
		>
			<div className='grid-gridContainer'>
				<div className='grid-gridInnerContainer'>{renderGrid(grid)}</div>
			</div>
			<nav>
				<i
					className='material-icons consoleButton clickable dark'
					title={
						isTerminalOpen ? consoleText.closeConsole : consoleText.openConsole
					}
					onClick={() => setIsTerminalOpen(!isTerminalOpen)}
				>
					{isTerminalOpen ? 'code_off' : 'code'}
				</i>
			</nav>
			<Console
				display={isTerminalOpen}
				docsKey='AnimateEngineGrid-clearLoop'
				AnimateEngine={AnimateEngine}
			/>
		</div>
	);
}

export default PathfindingVisualiser;
