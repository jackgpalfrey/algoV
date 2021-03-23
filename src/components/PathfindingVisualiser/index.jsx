import React, { useEffect, useState } from 'react';
import './style.css';
import Console from '../Console';
import InfoCard from '../InfoCard';

import getLocaleText from '../../util/getLocaleText';
import AnimateEngineCore from '../../util/AnimateEngine.ts';

const AnimateEngineController = new AnimateEngineCore();

const consoleText = getLocaleText('general').console;
const text = getLocaleText('general').grid;
const algoData = getLocaleText('algorithmInfo');

const TILES = ['wall', 'start', 'end', 'none'];

function PathfindingVisualiser() {
	//#region state
	let sortingCookie = document.cookie
		.split('; ')
		.find((row) => row.startsWith('grid='));
	if (!sortingCookie || sortingCookie == '') {
		sortingCookie = '100,astar,30';
	} else {
		sortingCookie = sortingCookie.split('=')[1];
	}

	const cookieData = sortingCookie.replace(' ', '').split(',');

	const [grid, setGrid] = useState();
	const [mouseDown, setMouseDown] = useState(0);
	const [penType, setPenType] = useState('start');
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [animationActive, setAnimationActive] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(
		parseInt(cookieData[0]) || 100
	);
	const [activeAlgorithm, setActiveAlgorithm] = useState(
		cookieData[1] || 'astar'
	);
	const [sizeOfNodes, setSizeOfNodes] = useState(cookieData[2] || 30);
	const [runTime, setRunTime] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const [comparisons, setComparisons] = useState(0);
	const [startPos, setStartPos] = useState([-1, -1]);
	const [endPos, setEndPos] = useState([-1, -1]);
	const [draggingTlle, setDraggingTile] = useState(0);

	AnimateEngineController.__setMainDataFunction__(setGrid);

	//#endregion

	useEffect(
		(effect) => {
			document.cookie = `grid=${animationSpeed},${activeAlgorithm},${sizeOfNodes};`;
		},
		[animationSpeed, activeAlgorithm, sizeOfNodes]
	);

	useEffect(() => {
		createGrid();
	}, []);

	function AnimateEngine(command) {
		try {
			let commandCode = [command];
			if (Array.isArray(command)) commandCode = command[0];

			let response = ['PENDING', 'In progress'];

			switch (commandCode) {
				case 'setState':
					let indexArray = command[1];
					let type = command[2];
					let data = command[3];

					AnimateEngineController.setGridState(
						indexArray,
						type,
						data,
						startPos,
						endPos,
						setStartPos,
						setEndPos
					);
					break;

				case 'st':
				case 'setType':
					let indexs = command[1];
					let typeToSet = command[2];
					AnimateEngineController.setGridState(
						indexs,
						'type',
						typeToSet,
						startPos,
						endPos,
						setStartPos,
						setEndPos
					);
					break;

				case 'do':
					let subCommands = command[1];
					let interval = command[2];

					AnimateEngineController.do(
						subCommands,
						interval,
						animationSpeed,
						AnimateEngine
					);
					break;

				case 'doFor':
					let commandsToRun = command[1];
					let repeats = command[2];
					let intervalBetweenEach = command[3];

					AnimateEngineController.doFor(
						commandsToRun,
						intervalBetweenEach,
						repeats,
						animationSpeed,
						AnimateEngine
					);
					break;

				case 'doSim':
					let toRunCommands = command[1];
					AnimateEngine(['do', toRunCommands, 0]);
					break;

				case 'doIn':
					let commandsToExecute = command[1];
					let waitFor = command[2];

					AnimateEngineController.doIn(
						commandsToExecute,
						waitFor,
						AnimateEngine
					);

					break;

				case 'rg':
				case 'resetGrid':
					let nodeSize = command[1] || sizeOfNodes;
					AnimateEngineController.resetGrid(
						nodeSize,
						window.innerWidth,
						window.innerHeight,
						setGrid,
						setPenType,
						setStartPos,
						setEndPos
					);
					break;

				case 'clearAnimation':
					AnimateEngineController.clearGridAnimationTiles(setGrid);
					break;

				case 'setRuntimeDisplay':
					let newRuntime = command[1];
					AnimateEngineController.setDisplay(newRuntime, setRunTime);
					break;

				case 'setComparisonsDisplay':
					let newComparisons = command[1];
					AnimateEngineController.setDisplay(newComparisons, setComparisons);
					break;

				case 'setSwapsDisplay':
					let newSwaps = command[1];
					AnimateEngineController.setDisplay(newSwaps, setSwaps);
					break;

				case 'startAnimation':
					setAnimationActive(true);
					break;

				case 'endAnimation':
					setAnimationActive(false);
					break;

				case 'executeInternalAnimation': //TODO:
					break;
					let animationKey = command[1];
					if (!animationKey || typeof animationKey !== 'string')
						return ['ERROR', 'Invalid Animation Key'];
					let resultData = [];
					switch (animationKey) {
						case 'bubbleSort':
							//resultData = bubbleSort(getNumbersFromArrayState());
							break;
						default:
							return ['ERROR', 'Invalid Animation Key'];
							break;
					}

					AnimateEngine(['doSim', [resultData]]);
					break;

				default:
			}
			return ['SUCCESS', 'Exectuted Successfully'];
		} catch (error) {
			return ['ERROR', 'Try Failed'];
		}
	}

	function handleMouseDown(x, y, type) {
		let toType = type || penType;

		if (
			(startPos[0] === x && startPos[1] === y) ||
			(endPos[0] === x && endPos[1] === y) ||
			animationActive
		) {
			return;
		}
		if (mouseDown === 2 || type === 'eraser') {
			toType = 'none';
		}

		if (penType === 'start') {
			AnimateEngine(['setState', [[x, y]], 'type', 'start']);
			if (endPos[0] === 0 || endPos[1] === 0) {
				setPenType('end');
			} else {
				setPenType('wall');
			}
			return;
		} else if (penType === 'end') {
			AnimateEngine(['setState', [[x, y]], 'type', 'end']);
			setPenType('wall');
			return;
		} else if (penType === 'wall') {
			if (
				(startPos[0] === y && startPos[1] === x) ||
				(endPos[0] === y && endPos[1] === x)
			) {
				return;
			}
		}
		AnimateEngine(['setState', [[x, y]], 'type', toType]);
	}

	function createGrid(nodeSize) {
		nodeSize = nodeSize || sizeOfNodes;
		AnimateEngine(['resetGrid', nodeSize]);
	}

	function renderGrid(array) {
		if (!array) return;
		let yDivs = array.map((xAxis) => {
			let xDivs = xAxis.map((val) => {
				let icon = '';
				let startX = startPos[0];
				let startY = startPos[1];

				let endX = endPos[0];
				let endXdiff = endX - val.x;
				let endY = endPos[1];
				let endYdiff = endY - val.y;

				if (val.type === 'end') {
					icon = 'flag';
				} else if (val.type === 'start') {
					if (Math.abs(endYdiff) > Math.abs(endXdiff)) {
						if (endYdiff < 0) {
							icon = 'keyboard_arrow_up';
						} else {
							icon = 'keyboard_arrow_down';
						}
					} else {
						if (endXdiff > 0) {
							icon = 'keyboard_arrow_right';
						} else {
							icon = 'keyboard_arrow_left';
						}
					}
					if (endX === 0 && endY === 0) {
						icon = 'keyboard_arrow_right';
					}
				}

				let extraClass = '=';

				if (val.x === startX && val.y === startY) {
					extraClass = 'startPos';
				} else if (val.x === endX && val.y === endY) {
					extraClass = 'endPos';
				}

				return (
					<div
						onMouseMove={(e) => {
							if (e.buttons <= 0 || penType === 'start' || penType === 'end')
								return;

							if (draggingTlle === 1) {
								handleMouseDown(val.x, val.y, 'start');
							} else if (draggingTlle === 2) {
								handleMouseDown(val.x, val.y, 'end');
							} else {
								handleMouseDown(val.x, val.y);
							}
						}}
						onMouseDown={(e) => {
							if (val.type === 'start') {
								setDraggingTile(1);
							}
							if (val.type === 'end') {
								setDraggingTile(2);
							}
							if (e.button === 2)
								return handleMouseDown(val.x, val.y, 'eraser');
							handleMouseDown(val.x, val.y);
						}}
						onMouseUp={() => {
							setDraggingTile(0);
						}}
						onContextMenu={(e) => {
							e.preventDefault();
						}}
						className={`grid-xAxis-Divs node-type-${val.type} ${extraClass}`}
						style={{ width: `${sizeOfNodes}px`, height: `${sizeOfNodes}px` }}
					>
						<i className='material-icons'>{icon}</i>
					</div>
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
					<option value='none'>Eraser</option>
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
				<div className='sliderBox'>
					<p
						className={animationActive ? 'disabled' : ''}
					>{`${text.nodeSizeSlider} (${sizeOfNodes}) `}</p>
					<input
						className='clickable'
						disabled={animationActive}
						type='range'
						min='20'
						max='50'
						value={sizeOfNodes}
						onChange={(e) => {
							setSizeOfNodes(parseInt(e.target.value));
							createGrid(parseInt(e.target.value));
						}}
					></input>
				</div>

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
