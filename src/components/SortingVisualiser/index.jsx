import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import bubbleSort from '../../algoithms/sorting/bubbleSort';
import heapSort from '../../algoithms/sorting/heapSort';
import insertionSort from '../../algoithms/sorting/insertionSort';
import mergeSort from '../../algoithms/sorting/mergeSort';
import quickSort from '../../algoithms/sorting/quickSort';
import reverseArray from '../../algoithms/sorting/reverseArray';
import selectionSort from '../../algoithms/sorting/selectionSort';
import Console from '../Console';
import InfoCard from '../InfoCard';
import './style.css';

import getLocaleText from '../../util/getLocaleText';
import AnimateEngineCore from '../../util/AnimateEngine';

const consoleText = getLocaleText('general').console;
const text = getLocaleText('general').bars;
const algoData = getLocaleText('algorithmInfo');

const AnimateEngineController = new AnimateEngineCore();

const COLORS = {
	BASE: '#035efc',
	CHECKING: 'red',
	DONE: '#0f8707',
	TEXT: 'white',
};

function SortingVisualiser(props) {
	//#region State Creation
	let sortingCookie = document.cookie
		.split('; ')
		.find((row) => row.startsWith('sort='));
	if (!sortingCookie || sortingCookie == '') {
		sortingCookie = '100,bubbleSort';
	} else {
		sortingCookie = sortingCookie.split('=')[1];
	}
	const cookieData = sortingCookie.replace(' ', '').split(',');
	let animationtype = cookieData[0];
	let urlAnimation = useLocation().search.replace('?', '');
	if (urlAnimation && Object.keys(algoData['sorting']).includes(urlAnimation))
		animationtype = urlAnimation;
	if (!Object.keys(algoData['sorting']).includes(urlAnimation))
		animationtype = 'bubbleSort';
	const [array, setArray] = useState([]);
	const [animationSpeed, setAnimationSpeed] = useState(cookieData[0] || 100);
	const [numBars, setNumBars] = useState(
		Math.round(window.innerWidth / 12 / 2)
	);
	const [runTime, setRunTime] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const [comparisons, setComparisons] = useState(0);
	const [animationActive, setAnimationActive] = useState(false);
	const [activeAlgorithm, setActiveAlgorithm] = useState(
		animationtype || 'bubbleSort'
	);
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [activeTimeouts, setActiveTimeouts] = useState([]);
	const [activeIntervals, setActiveIntervals] = useState([]);

	AnimateEngineController.__setMainDataFunction__(setArray);
	//#endregion

	useEffect(
		(effect) => {
			document.cookie = `sort=${animationSpeed},${activeAlgorithm};`;
		},
		[animationSpeed, activeAlgorithm]
	);

	useEffect((effect) => {
		AnimateEngine(['resetArray', numBars]);
	}, []);

	function AnimateEngine(command) {
		try {
			let commandCode = command;
			if (Array.isArray(command)) commandCode = command[0];

			let response = ['PENDING', 'In progress'];
			switch (commandCode) {
				case 'setState':
					let indexArray = command[1];
					let type = command[2];
					let data = command[3];

					AnimateEngineController.setBarsState(indexArray, type, data);

					break;

				case 'sc':
				case 'setColor':
					let idxes = command[1];
					let color = command[2];

					AnimateEngineController.setBarsState(idxes, 'color', color, setArray);
					break;

				case 'swap':
					let id1 = command[1];
					let id2 = command[2];

					AnimateEngineController.swapBars(id1, id2, setArray);
					break;

				case 'setValue':
					let idxs = command[1];
					let value = command[2];

					AnimateEngineController.setBarsState(idxs, 'value', value);
					break;

				case 'setArray':
					let values = command[1];
					let colorCode = command[2];

					AnimateEngineController.setBars(values, colorCode, setNumBars);
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

				case 'ra':
				case 'resetArray':
					let numOfBars = command[1];
					if (!numOfBars || typeof numOfBars !== 'number' || numOfBars <= 0)
						numOfBars = numBars;

					AnimateEngineController.resetBars(numOfBars, setNumBars);
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

				case 'clearLoop': //FIXME: Dosen't work
					let specificLoop = command[1];
					let activeLoops = activeIntervals.slice();
					if (specificLoop == undefined) {
						let ALLen = activeLoops.length;
						for (let i = 0; i < ALLen; i++) {
							clearInterval(activeLoops.pop());
						}
					} else if (typeof specificLoop === 'number') {
						let loop = activeLoops.splice(specificLoop, 1)[0];
						clearInterval(loop);
					} else if (typeof specificLoop === 'string') {
						let loop = activeLoops.indexOf(parseInt(specificLoop))[0];
						clearInterval(loop);
					}

					setActiveIntervals(activeLoops);

					break;

				case 'clearWait': //FIXME: Dosen't work
					let activeWaits = activeTimeouts.slice();
					let AWLen = activeWaits.length;
					for (let i = 0; i < AWLen; i++) {
						clearTimeout(activeWaits.pop());
					}
					break;

				case 'ct':
				case 'clearTimers': //FIXME: Dosen't work
					AnimateEngine(['clearLoops']);
					AnimateEngine(['clearWaits']);
					break;

				case 'r':
				case 'reload':
					window.location.reload();
					break;

				case 'executeInternalAnimation':
					let animationKey = command[1];
					if (!animationKey || typeof animationKey !== 'string')
						return ['ERROR', 'Invalid Animation Key'];
					let resultData = [];
					switch (animationKey) {
						case 'bubbleSort':
							resultData = bubbleSort(getNumbersFromArrayState());
							break;
						case 'selectionSort':
							resultData = selectionSort(getNumbersFromArrayState());
							break;
						case 'insertionSort':
							resultData = insertionSort(getNumbersFromArrayState());
							break;
						case 'quickSort':
							return alert('Currently Unavailable');
							resultData = quickSort(getNumbersFromArrayState());
							break;
						case 'heapSort':
							resultData = heapSort(getNumbersFromArrayState());
							break;
						case 'mergeSort':
							return alert('Currently Unavailable');
							resultData = mergeSort(getNumbersFromArrayState());
							break;
						case 'reverseArray':
							resultData = reverseArray(getNumbersFromArrayState());
							break;
						default:
							return ['ERROR', 'Invalid Animation Key'];
							break;
					}

					AnimateEngine(['doSim', [resultData]]);
					break;

				case 'version':
					let version = document.cookie
						.split('; ')
						.find((row) => row.startsWith('version='))
						.split('=')[1];
					alert(`Version: ${version}`);
					break;

				case 'defaultColor':
					let codeForColor = command[1];
					let colorForCode = command[2];
					AnimateEngineController.setDefaultBarColors(
						codeForColor,
						colorForCode
					);
					break;

				default:
					return ['ERROR', 'Unknown Command'];
					break;
			}

			return ['SUCCESS', 'Exectuted Successfully'];
		} catch (error) {
			console.error(error);
			return ['ERROR', 'Try Failed'];
		}
	}

	function getNumbersFromArrayState() {
		let numbers = [];
		for (let i = 0; i < array.length; i++) {
			numbers.push(array[i].value);
		}

		return numbers;
	}

	function handleSortClick() {
		if (animationActive) return false;
		AnimateEngine(['executeInternalAnimation', activeAlgorithm]);
	}

	function createBars() {
		let barWidth = ((window.innerWidth / 100) * 90) / numBars;

		let barsDivs = array.map((item, idx) => {
			let style = {
				height: `${item.value}%`,
				backgroundColor: `${item.color}`,
				width: barWidth,
				margin: barWidth / 4 > 20 ? 20 : barWidth / 4,
				fontSize: barWidth > 20 ? barWidth / 3 : 0,
				color: COLORS.TEXT,
				fontWeight: 'bold',
			};

			return (
				<div key={idx} title={item.value} className='bar' style={style}>
					{item.value}
				</div>
			);
		});

		return barsDivs;
	}

	return (
		<div className='sort-container'>
			<div className='bar-container'>
				<div className='inner-bar-container'>{createBars()}</div>
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
				<button
					disabled={animationActive}
					onClick={() => {
						if (!animationActive) {
							AnimateEngine(['resetArray', numBars]);
						}
					}}
					className={`${
						!animationActive ? 'button reset' : 'button-disabled reset'
					} clickable`}
				>
					{text.resetButton}
				</button>
				<button
					disabled={animationActive}
					onClick={handleSortClick}
					className={`${
						!animationActive ? 'button sort' : 'button-disabled sort'
					} clickable`}
				>
					{text.runButton}
				</button>
				<select
					className='clickable'
					disabled={animationActive}
					value={activeAlgorithm}
					name={activeAlgorithm}
					onChange={(e) => {
						setActiveAlgorithm(e.target.value);
					}}
				>
					<option
						disabled
						className='algorithmsTitle clickable'
						value='otherTitle'
					>
						{text.sortingAlgorithmsTitle}
					</option>
					<option value='bubbleSort'>
						{algoData.sorting['bubbleSort'].title}
					</option>
					<option value='selectionSort'>
						{algoData.sorting['selectionSort'].title}
					</option>
					<option value='insertionSort'>
						{algoData.sorting['insertionSort'].title}
					</option>
					<option value='quickSort'>
						{algoData.sorting['quickSort'].title}
					</option>
					<option value='heapSort'>{algoData.sorting['heapSort'].title}</option>
					<option value='mergeSort'>
						{algoData.sorting['mergeSort'].title}
					</option>
					<option disabled className='algorithmsTitle' value='otherTitle'>
						{text.otherAlgorithmsTitle}
					</option>
					<option value='reverseArray'>
						{algoData.sorting['reverseArray'].title}
					</option>
				</select>

				<div className='sliderBox'>
					<p
						className={animationActive ? 'disabled' : ''}
					>{`${text.numberOfBarsSlider} (${numBars})`}</p>
					<input
						className='clickable'
						disabled={animationActive}
						type='range'
						min='5'
						max={`${Math.round(window.innerWidth / 12) - 10}`}
						value={numBars}
						onChange={(e) => {
							AnimateEngine(['resetArray', parseInt(e.target.value)]);
						}}
					></input>
				</div>

				<p
					title={`${text.swapsDisplay} ${swaps} \n${text.comparisonsDisplay} ${comparisons}`}
					className='timeTaken'
				>{`${text.runtimeDisplay} ${runTime}ms`}</p>
			</nav>
			<InfoCard algorithmType='sorting' algorithmID={activeAlgorithm} />

			<Console
				display={isTerminalOpen}
				docsKey='AnimateEngineBars-clearLoop'
				AnimateEngine={AnimateEngine}
			/>
		</div>
	);
}

export default SortingVisualiser;
