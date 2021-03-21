class AnimateEngine {
	BARSCOLORS = {
		BASE: '#035efc',
		CHECKING: 'red',
		DONE: '#0f8707',
		TEXT: 'white',
	};

	TILES = ['wall', 'start', 'end', 'none'];

	constructor() {}

	// Sets Main Data Manipulation Function eg. setArray / setGrid
	__setMainDataFunction__(setStateFunction) {
		this.setStateFunction = setStateFunction;
	}
	// Sets Bar State in the Bar Visualiser
	setBarsState(indexArray, type, data) {
		// Check to see if input is valid
		if (!indexArray || !Array.isArray(indexArray))
			return ['ERROR', 'Invalid Indexs'];
		if (!type || typeof type !== 'string') return ['ERROR', 'Invalid Type'];

		type = type.toLowerCase();

		// Checks to see if data is valid
		if (type === 'color') {
			if (typeof data !== 'string') return ['ERROR', 'Invalid Data'];

			if (data.includes('$')) data = this.BARSCOLORS[data.replace('$', '')]; // CONTROLS COLOUR VARAIBLES
		} else if (type === 'value') {
			if (typeof data !== 'number') return ['ERROR', 'Invalid Data'];
		} else {
			return ['ERROR', 'Invalid Type'];
		}

		this.setStateFunction((prevState) => {
			let newArray = prevState.slice();

			indexArray.forEach((idx) => {
				if (typeof idx == 'number' && idx >= 0 && idx < newArray.length) {
					newArray[idx][type] = data;
				}
				if (
					typeof idx == 'number' &&
					idx < 0 &&
					Math.abs(idx) <= newArray.length
				) {
					newArray[newArray.length - Math.abs(idx)][type] = data;
				} else if (idx === '$ALL') {
					for (let y = 0; y < newArray.length; y++) {
						newArray[y][type] = data;
					}
				} else if (idx === '$LHALF') {
					for (let y = 0; y < Math.ceil(newArray.length / 2); y++) {
						newArray[y][type] = data;
					}
				} else if (idx === '$RHALF') {
					for (
						let y = Math.floor(newArray.length / 2);
						y < newArray.length;
						y++
					) {
						newArray[y][type] = data;
					}
				} else if (idx === '$ODD') {
					for (let y = 0; y < newArray.length; y++) {
						if (y % 2 === 0) newArray[y][type] = data;
					}
				} else if (idx === '$EVEN') {
					for (let y = 0; y < newArray.length; y++) {
						if (y % 2 === 1) newArray[y][type] = data;
					}
				} else if (idx === '$MID') {
					newArray[Math.floor((newArray.length - 1) / 2)][type] = data;
					newArray[Math.ceil((newArray.length - 1) / 2)][type] = data;
				}
			});

			return newArray;
		});
	}

	// Sets Node State in Grid Visualiser
	setGridState(
		indexArray,
		type,
		data,
		startPos,
		endPos,
		setStartPosFunction,
		setEndPosFunction
	) {
		// Validity Checks
		if (!indexArray || !Array.isArray(indexArray))
			return ['ERROR', 'Invalid Indexes'];
		if (!type || typeof type !== 'string') return ['ERROR', 'Invalid Type'];

		type = type.toLowerCase();
		if (type === 'type' && !this.TILES.includes(data)) {
			return ['ERROR', 'Invalid Type'];
		}
		if (typeof data !== 'string') return ['ERROR', 'Invalid Data'];

		this.setStateFunction((prevState) => {
			let newGrid = prevState.slice();

			indexArray.forEach((value) => {
				if (value[1] > newGrid.length || value[0] > newGrid[0].length) {
					return newGrid;
				}

				if (type === 'type' && data === 'start') {
					let startY = startPos[1];
					let startX = startPos[0];
					let prevType = 'none';
					newGrid[startY][startX].type = prevType;
					let curType = newGrid[value[1]][value[0]].type;
					setStartPosFunction([value[0], value[1], curType]);
				}
				if (type === 'type' && data === 'end') {
					let startY = endPos[1];
					let startX = endPos[0];
					let prevType = 'none';
					newGrid[startY][startX].type = prevType;
					let curType = newGrid[value[1]][value[0]].type;
					setEndPosFunction([value[0], value[1], curType]);
				}
				newGrid[value[1]][value[0]][type] = data;
			});

			return newGrid;
		});
	}

	// Swaps two bars in the Bar Visulaiser
	swapBars(idx1, idx2) {
		// Checks If Indexes are valid
		if (idx1 == undefined || typeof idx1 !== 'number')
			return ['ERROR', 'Invalid id1'];
		if (idx2 == undefined || typeof idx2 !== 'number')
			return ['ERROR', 'Invalid id2'];

		this.setStateFunction((prevState) => {
			let newArray = prevState.slice();

			// Handles Negative Indexes
			if (idx1 < 0) idx1 = newArray.length - Math.abs(idx1);
			if (idx2 < 0) idx2 = newArray.length - Math.abs(idx2);

			if (
				idx1 >= 0 &&
				idx1 < newArray.length &&
				idx2 >= 0 &&
				idx2 < newArray.length
			) {
				const tmp1 = { ...newArray[idx1] };
				const tmp2 = { ...newArray[idx2] };
				newArray[idx1] = tmp2;
				newArray[idx2] = tmp1;
			}

			return newArray;
		});
	}

	// Sets Bars to given values in Bar Visualiser
	setBars(values, color, setNumBarsFunction) {
		// Validity Checks
		if (!values || !Array.isArray(values)) return ['ERROR', 'Invalid Values'];
		if (!color || typeof color !== 'string') return ['ERROR', 'Invalid Color'];

		this.setStateFunction((prevState) => {
			let newArray = [];
			if (color.includes('$')) color = this.BARSCOLORS[color.replace('$', '')]; // Color variables System

			values.forEach((value) => {
				if (typeof value == 'number') {
					newArray.push({ value: value, color: color });
				}
			});
			setNumBarsFunction(newArray.length);
			return newArray;
		});
	}

	// Resets Bars In Bar Visualiser
	resetBars(numOfBars, setNumBarsFunction) {
		if (typeof numOfBars !== 'number' || numOfBars <= 0)
			return ['ERROR', 'Invalid Number of bars'];

		let randValues = [];
		for (let i = 0; i < numOfBars; i++) {
			randValues.push(Math.round(Math.random() * 73) + 13);
		}
		this.setBars(randValues, this.BARSCOLORS['BASE'], setNumBarsFunction);
	}

	// Resets Nodes in Grid Visauliser
	resetGrid(
		sizeOfNodes,
		areaWidth,
		areaHeight,
		setGridFunction,
		setPenTypeFunction,
		setStartPosFunction,
		setEndPosFunction
	) {
		const NUM_OF_BARS_Y = ((areaHeight / 100) * 86) / sizeOfNodes;
		const NUM_OF_BARS_X = ((areaWidth / 100) * 98) / sizeOfNodes;
		let yAxis = [];
		for (let yPos = 0; yPos < NUM_OF_BARS_Y; yPos++) {
			let xAxis = [];
			for (let xPos = 0; xPos < NUM_OF_BARS_X; xPos++) {
				xAxis.push({
					x: xPos,
					y: yPos,
					type: 'none',
					TLtext: '',
					TRtext: '',
					BLtext: '',
					BRtext: '',
					descText: '',
				});
			}
			yAxis.push(xAxis);
		}
		setGridFunction(yAxis);
		setPenTypeFunction('start');
		setStartPosFunction([0, 0, 'none']);
		setEndPosFunction([0, 0, 'none']);
	}

	// Sets a data display eg. Runtime
	setDisplay(newData, setDataFunction) {
		if (!newData) return ['ERROR', 'Invalid Data'];
		setDataFunction(newData);
	}

	// Sets Default Colors for Bar Visualiser
	setDefaultBarColors(colorCode, color) {
		this.BARSCOLORS[colorCode] = color;
	}

	// Executes given commands in order with given interval between each exection
	do(
		commandsToRun,
		intervalBetweenCommands,
		defaultAnimationSpeed,
		AnimateEngineFunction
	) {
		// Validity Checks
		if (!commandsToRun || !Array.isArray(commandsToRun))
			return ['ERROR', 'Invalid Sub Commands'];
		if (
			(!intervalBetweenCommands && intervalBetweenCommands != 0) ||
			(typeof intervalBetweenCommands !== 'number' &&
				intervalBetweenCommands != '$userSet') ||
			intervalBetweenCommands < 0
		)
			if (intervalBetweenCommands == '$userSet') {
				intervalBetweenCommands = defaultAnimationSpeed;
			}

		// 0 Interval = Simultaneous Command Execution
		if (intervalBetweenCommands == 0) {
			for (let i = 0; i < commandsToRun.length; i++) {
				AnimateEngineFunction(commandsToRun[i]);
			}
			return;
		}

		AnimateEngineFunction(commandsToRun[0]);
		let currentCommandIdx = 1;

		let intervalID = setInterval(() => {
			if (currentCommandIdx >= commandsToRun.length) {
				return;
			}

			AnimateEngineFunction(commandsToRun[currentCommandIdx]);
			currentCommandIdx++;
		}, intervalBetweenCommands);
	}

	// Executes given commands over and over for given number of repeats with given interval between each exectuion
	doFor(
		commandsToRun,
		intervalBetweenCommands,
		repeats,
		defaultAnimationSpeed,
		AnimateEngineFunction
	) {
		// #region  Validity Checks
		if (!commandsToRun || !Array.isArray(commandsToRun)) {
			return ['ERROR', 'Invalid Sub Commands'];
		}

		if (
			(!repeats && repeats !== 0) ||
			typeof repeats !== 'number' ||
			repeats < 0
		) {
			return ['ERROR', 'Invalid Repeats'];
		}

		if (
			(!intervalBetweenCommands && intervalBetweenCommands !== 0) ||
			(typeof intervalBetweenCommands !== 'number' &&
				intervalBetweenCommands !== '$userSet') ||
			intervalBetweenCommands < 0
		) {
			return ['ERROR', 'Invalid Interval'];
		}

		//#endregion

		if (intervalBetweenCommands === '$userSet') {
			intervalBetweenCommands = parseInt(defaultAnimationSpeed);
		}

		let currentIteration = 1;
		AnimateEngineFunction(['do', commandsToRun, intervalBetweenCommands]);

		let intervalIdentifier = setInterval(() => {
			if (currentIteration >= repeats && repeats !== 0) {
				return;
			}

			AnimateEngineFunction(['do', commandsToRun, intervalBetweenCommands]);

			currentIteration++;
		}, intervalBetweenCommands * commandsToRun.length);
	}

	// Executes given command after given time frame
	doIn(commandsToRun, timeUntilExectution, AnimateEngineFunction) {
		if (!commandsToRun || !Array.isArray(commandsToRun))
			return ['ERROR', 'Invalid Sub Commands'];
		if (
			!timeUntilExectution ||
			typeof timeUntilExectution !== 'number' ||
			timeUntilExectution <= 0
		)
			return ['ERROR', 'Wait Time Invalid'];

		let timeoutID = setTimeout(() => {
			commandsToRun.forEach((value) => {
				AnimateEngineFunction(value);
			});
		}, timeUntilExectution);
	}
}

export default AnimateEngine;
