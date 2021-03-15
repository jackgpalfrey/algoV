import React, { useEffect, useState } from 'react';
import './style.css';
import Console from '../Console';

function PathfindingVisualiser() {
	const [grid, setGrid] = useState();
	const [isMouseDown, setIsMouseDown] = useState(false);

	useEffect(() => {
		createGrid();
	}, []);

	function AnimateEngine() {
		return;
	}

	function createGrid() {
		const NUM_OF_BARS_Y = 20;
		const NUM_OF_BARS_X = 40;
		let yAxis = [];
		for (let yPos = 0; yPos < NUM_OF_BARS_Y; yPos++) {
			let xAxis = [];
			for (let xPos = 0; xPos < NUM_OF_BARS_X; xPos++) {
				xAxis.push({
					x: xPos,
					y: yPos,
					color: 'transparent',
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
							setGrid((prevState) => {
								let prevGrid = prevState.slice();
								prevGrid[val.y][val.x].color = 'blue';
								return prevGrid;
							});
						}}
						onMouseDown={() => {
							setGrid((prevState) => {
								let prevGrid = prevState.slice();
								prevGrid[val.y][val.x].color = 'blue';
								return prevGrid;
							});
						}}
						className='grid-xAxis-Divs'
						style={{ backgroundColor: val.color }}
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
