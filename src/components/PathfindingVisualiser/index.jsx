import React, { useEffect, useState } from 'react';
import './style.css';
import Console from '../Console';

function PathfindingVisualiser() {
	const [grid, setGrid] = useState();
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [penColor, setPenColor] = useState('red');
	const [penType, setPenType] = useState('wall');

	useEffect(() => {
		createGrid();
	}, []);

	function AnimateEngine() {
		return;
	}

	function handleMouseDown(x, y) {
		setGrid((prevState) => {
			let prevGrid = prevState.slice();
			prevGrid[y][x].color = penColor;
			prevGrid[y][x].type = penType;
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
		console.log(array);
		if (!array) return;
		console.log('PASS');
		let yDivs = array.map((xAxis) => {
			let xDivs = xAxis.map((val) => {
				return (
					<div
						onMouseEnter={() => {
							if (!isMouseDown) return;
							handleMouseDown(val.x, val.y);
						}}
						onMouseDown={() => {
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
			onMouseDown={() => {
				setIsMouseDown(true);
			}}
			onMouseUp={() => {
				setIsMouseDown(false);
			}}
		>
			<div className='grid-gridContainer'>
				<div className='grid-gridInnerContainer'>{renderGrid(grid)}</div>
			</div>
			<Console
				display={false}
				docsKey='AnimateEngineGrid-clearLoop'
				AnimateEngine={AnimateEngine}
			/>
		</div>
	);
}

export default PathfindingVisualiser;
