import React, { useEffect, useState } from 'react';
import './style.css';
import Console from '../Console';
import InfoCard from '../InfoCard';

import getLocaleText from '../../util/getLocaleText';
const consoleText = getLocaleText('general').console;
const text = getLocaleText('general').grid;
const algoData = getLocaleText('algorithmInfo');

function PathfindingVisualiser() {
	const [grid, setGrid] = useState();
	const [mouseDown, setMouseDown] = useState(0);
	const [penColor, setPenColor] = useState('red');
	const [penType, setPenType] = useState('start');
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [animationActive, setAnimationActive] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(100);
	const [activeAlgorithm, setActiveAlgorithm] = useState('astar');
	const [runTime, setRunTime] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const [comparisons, setComparisons] = useState(0);
	const [startPos, setStartPos] = useState([0, 0]);
	const [endPos, setEndPos] = useState([0, 0]);

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
			let prevGrid = prevState.slice();

			if (mouseDown === 2 || type === 'eraser') {
				console.log('RIGHT');
				toType = 'none';
				toColor = 'transparent';
			}

			if (penType === 'start') {
				let startY = startPos[0];
				let startX = startPos[1];
				prevGrid[startY][startX].color = 'transparent';
				prevGrid[startY][startX].type = 'none';
				setStartPos([y, x]);
				if (endPos[0] === 0 || endPos[1] === 0) {
					setPenType('end');
				} else {
					setPenType('wall');
				}
			} else if (penType === 'end') {
				let endY = endPos[0];
				let endX = endPos[1];
				prevGrid[endY][endX].color = 'transparent';
				prevGrid[endY][endX].type = 'none';
				setEndPos([y, x]);
				setPenType('wall');
			} else if (penType === 'wall') {
				if (
					(startPos[0] === y && startPos[1] === x) ||
					(endPos[0] === y && endPos[1] === x)
				) {
					return prevGrid;
				}
			}

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
		setPenType('start');
	}

	function renderGrid(array) {
		if (!array) return;
		let yDivs = array.map((xAxis) => {
			let xDivs = xAxis.map((val) => {
				return (
					<div
						onMouseEnter={() => {
							if (mouseDown < 1 || penType === 'start' || penType === 'end')
								return;
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

	function handleRunClick() {
		return;
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
				<div className='sliderBox'>
					<p
						className={animationActive ? 'disabled' : ''}
					>{`${text.animationTimeSlider} (${animationSpeed}ms) `}</p>
					<input
						className='clickable'
						disabled={animationActive}
						type='range'
						min='1'
						max='1000'
						value={animationSpeed}
						onChange={(e) => {
							setAnimationSpeed(parseInt(e.target.value));
						}}
					></input>
				</div>
				<select
					className='clickable'
					disabled={animationActive}
					value={penType}
					name={penType}
					onChange={(e) => {
						setPenType(e.target.value);
					}}
				>
					<option value='start'>Draw Start</option>
					<option value='end'>Draw End</option>
					<option value='wall'>Draw Wall</option>
				</select>
				<button
					disabled={animationActive}
					onClick={handleRunClick}
					className={`${
						!animationActive ? 'button sort' : 'button-disabled sort'
					} clickable`}
				>
					{text.runButton}
				</button>
				<button
					disabled={animationActive}
					onClick={() => {
						if (!animationActive) {
							createGrid();
						}
					}}
					className={`${
						!animationActive ? 'button reset' : 'button-disabled reset'
					} clickable`}
				>
					{text.resetButton}
				</button>
				<select
					className='clickable'
					disabled={animationActive}
					value={`${activeAlgorithm}`}
					name={`${activeAlgorithm}`}
					onChange={(e) => {
						setActiveAlgorithm(e.target.value);
					}}
				>
					<option
						disabled
						className='algorithmsTitle clickable'
						value='otherTitle'
					>
						{text.pathfindingAlgorithmsTitle}
					</option>
					<option value='astar'>A* Algorithm</option>
					<option value='dijkstra'>Dijkstra Algorithm</option>
				</select>
				<p
					title={`${text.swapsDisplay} ${swaps} \n${text.comparisonsDisplay} ${comparisons}`}
					className='timeTaken'
				>{`${text.runtimeDisplay} ${runTime}ms`}</p>
			</nav>
			<Console
				display={isTerminalOpen}
				docsKey='AnimateEngineGrid-clearLoop'
				AnimateEngine={AnimateEngine}
			/>

			<InfoCard algorithmType='grid' algorithmID={activeAlgorithm} />
		</div>
	);
}

export default PathfindingVisualiser;
