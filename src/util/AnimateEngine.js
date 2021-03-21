class AnimateEngine {
	BARSCOLORS = {
		BASE: '#035efc',
		CHECKING: 'red',
		DONE: '#0f8707',
		TEXT: 'white',
	};

	constructor() {}

	__setMainDataFunction__(setStateFunction) {
		this.setStateFunction = setStateFunction;
	}
	// Sets State in the Bar Visualiser
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

	resetBars(numOfBars, setNumBarsFunction) {
		if (typeof numOfBars !== 'number' || numOfBars <= 0)
			return ['ERROR', 'Invalid Number of bars'];

		let randValues = [];
		for (let i = 0; i < numOfBars; i++) {
			randValues.push(Math.round(Math.random() * 73) + 13);
		}
		this.setBars(randValues, this.BARSCOLORS['BASE'], setNumBarsFunction);
	}

	setDisplay(newData, setDataFunction) {
		if (!newData) return ['ERROR', 'Invalid Data'];
		setDataFunction(newData);
	}

	setDefaultBarColors(colorCode, color) {
		this.BARSCOLORS[colorCode] = color;
	}

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
