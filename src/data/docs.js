const data = {
	General: {
		id: 'General',
		name: 'General',
		pages: {
			Introduction: {
				id: 'Introduction',
				sideTitle: 'Introduction',
				title: 'General   -   Introduction',
				desc:
					'Welcome To AlgoV Docs. Click On The Sections To The Left to see the relevant pages.',
			},
		},
	},
	AnimateEngineSort: {
		id: 'AnimateEngineSort',
		name: 'AnimateEngine (Bars)',
		pages: {
			setState: {
				id: 'setState',
				sideTitle: 'setState',
				title: 'AnimateEngine (Bars)   -   setState',
				desc:
					'setState is used to manipulate the state of bars in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setState'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Indexes</span>],{' '}
						<span style={{ color: 'turquoise' }}>
							Type of data (value/color)
						</span>
						, <span style={{ color: 'gold' }}>Data</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setState'
						</span>
						,[<span style={{ color: 'pink' }}>1,2,-1,'$MID'</span>],{' '}
						<span style={{ color: 'turquoise' }}>'color'</span>,{' '}
						<span style={{ color: 'gold' }}>'red'</span>]{' '}
					</span>
				),
				arguments: [
					[
						'Array of Indexes',
						'Array with numbers or Index Variables',
						'[1,2,-1,"$MID"]',
						'Negative Numbers reference from the last bar. Available Index Variables: $ALL, $LHALF, $RHALF, $MID, $ODD, $EVEN',
					],
					['Type of data', 'String (Value / Color)', '"color"', ['None']],
					[
						'Data',
						'(Color) CSS Color Value OR Color Variable / (Value) Number',
						'"red" / "$CHECKING" / 10',
						['Available Color Varaibles: $BASE, $CHECKING, $DONE'],
					],
				],
			},
			setColor: {
				id: 'setColor',
				sideTitle: 'setColor',
				title: 'AnimateEngine (Bars)   -   setColor',
				desc:
					'setColor is an abstracted command based on setState used to change the color of bars in the Bar Visualiser.',
				alias: 'sc',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setColor'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Indexes</span>],{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setColor'
						</span>
						,[<span style={{ color: 'pink' }}>1,2,-1,'$MID'</span>],{' '}
						<span style={{ color: 'turquoise' }}>'red'</span>]
					</span>
				),
				arguments: [
					[
						'Array of Indexes',
						'Array with numbers or Index Variables',
						'[1,2,-1,"$MID"]',
						'Negative Numbers reference from the last bar. Available Index Variables: $ALL, $LHALF, $RHALF, $MID, $ODD, $EVEN',
					],
					[
						'Data',
						'CSS Color Value OR Color Variable',
						'"red" / "$CHECKING"',
						['Available Color Varaibles: $BASE, $CHECKING, $DONE'],
					],
				],
			},
			setValue: {
				id: 'setValue',
				sideTitle: 'setValue',
				title: 'AnimateEngine (Bars)   -   setValue',
				desc:
					'setValue is an abstracted command based on setState used to change the value of bars in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setValue'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Indexes</span>],{' '}
						<span style={{ color: 'turquoise' }}>Value</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setValue'
						</span>
						,[<span style={{ color: 'pink' }}>1,2,-1,'$MID'</span>],{' '}
						<span style={{ color: 'turquoise' }}>32</span>]
					</span>
				),
				arguments: [
					[
						'Array of Indexes',
						'Array with numbers or Index Variables',
						'[1,2,-1,"$MID"]',
						'Negative Numbers reference from the last bar. Available Index Variables: $ALL, $LHALF, $RHALF, $MID, $ODD, $EVEN',
					],
					['Value', 'Number', '32', 'None'],
				],
			},
			swap: {
				id: 'swap',
				sideTitle: 'swap',
				title: 'AnimateEngine (Bars)   -   swap',
				desc:
					'swap is use to swap two bars in the Bar Visualiser. This swaps both the value and the color of the bars.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'swap'
						</span>
						,<span style={{ color: 'pink' }}>Index 1</span>,
						<span style={{ color: 'turquoise' }}>Index 2</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'swap'
						</span>
						,<span style={{ color: 'pink' }}>1</span>,
						<span style={{ color: 'turquoise' }}>-1</span>]
					</span>
				),
				arguments: [
					[
						'Index 1',
						'Number',
						'1',
						'Negative Numbers reference from the last bar',
					],
					[
						'Index 2',
						'Number',
						'-1',
						'Negative Numbers reference from the last bar',
					],
				],
			},
			setArray: {
				id: 'setArray',
				sideTitle: 'setArray',
				title: 'AnimateEngine (Bars)   -   setArray',
				desc:
					'setArray is used to change the entire array to the given values in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setArray'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Values</span>],{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setArray'
						</span>
						,[<span style={{ color: 'pink' }}>1,2,18,22,55,16'</span>],{' '}
						<span style={{ color: 'turquoise' }}>'red'</span>]
					</span>
				),
				arguments: [
					[
						'Array of Values',
						'Array with numbers',
						'[1,2,18,22,55,16]',
						'None',
					],
					[
						'Color',
						'CSS Color Value OR Color Variable',
						'"red" / "$CHECKING"',
						['Available Color Varaibles: $BASE, $CHECKING, $DONE'],
					],
				],
			},
			resetArray: {
				id: 'resetArray',
				sideTitle: 'resetArray',
				title: 'AnimateEngine (Bars)   -   resetArray',
				desc:
					'resetArray is an abstracted command based on setArray used to reset the bars in the Bar Visualiser to a random set of value.',
				alias: 'ra',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'resetArray'
						</span>
						,<span style={{ color: 'pink' }}>Number of bars?</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'resetArray'
						</span>
						,<span style={{ color: 'pink' }}>32</span>]
					</span>
				),
				arguments: [
					[
						'Number of Bars',
						'Optional number',
						'32',
						'Leaving Number of Bars Out will reset array to number of bars set by the user',
					],
				],
			},
			setRuntimeDisplay: {
				id: 'setRuntimeDisplay',
				sideTitle: 'setRuntimeDisplay',
				title: 'AnimateEngine (Bars)   -   setRuntimeDisplay',
				desc:
					'setRuntimeDisplay is use to set the runtime display in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setRuntimeDisplay'
						</span>
						,<span style={{ color: 'pink' }}>Runtime</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setRuntimeDisplay'
						</span>
						,<span style={{ color: 'pink' }}>1</span>]
					</span>
				),
				arguments: [['Runtime', 'Number', '1', 'None']],
			},
			setComparisonsDisplay: {
				id: 'setComparisonsDisplay',
				sideTitle: 'setComparisonsDisplay',
				title: 'AnimateEngine (Bars)   -   setComparisonsDisplay',
				desc:
					'setComparisonsDisplay is use to set the comparisons display in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setComparisonsDisplay'
						</span>
						,<span style={{ color: 'pink' }}>Comparisons</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setComparisonsDisplay'
						</span>
						,<span style={{ color: 'pink' }}>100</span>]
					</span>
				),
				arguments: [['Comparisons', 'Number', '100', 'None']],
			},
			setSwapsDisplay: {
				id: 'setSwapsDisplay',
				sideTitle: 'setSwapsDisplay',
				title: 'AnimateEngine (Bars)   -   setSwapsDisplay',
				desc:
					'setSwapsDisplay is use to set the swaps display in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setSwapsDisplay'
						</span>
						,<span style={{ color: 'pink' }}>Swaps</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setSwapsDisplay'
						</span>
						,<span style={{ color: 'pink' }}>100</span>]
					</span>
				),
				arguments: [['Swaps', 'Number', '100', 'None']],
			},
			startAnimation: {
				id: 'startAnimation',
				sideTitle: 'startAnimation',
				title: 'AnimateEngine (Bars)   -   startAnimation',
				desc:
					'startAnimation is used to "start an animation" and block user input in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'startAnimation'
						</span>
						]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'startAnimation'
						</span>
						]
					</span>
				),
				arguments: [['N/A', 'N/A', 'N/A', 'N/A']],
			},
			endAnimation: {
				id: 'endAnimation',
				sideTitle: 'endAnimation',
				title: 'AnimateEngine (Bars)   -   endAnimation',
				desc:
					'endAnimation is used to "stop an animation" and reallow user input in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'endAnimation'
						</span>
						]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'endAnimation'
						</span>
						]
					</span>
				),
				arguments: [['N/A', 'N/A', 'N/A', 'N/A']],
			},
			clearLoop: {
				id: 'clearLoop',
				sideTitle: 'clearLoop',
				title: 'AnimateEngine (Bars)   -   clearLoop',
				desc:
					'WARNING: NOT FUNCTIONAL clearLoop is used to stop loops (intervals).',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearLoop'
						</span>
						,<span style={{ color: 'pink' }}>Loop ID?</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearLoop'
						</span>
						,<span style={{ color: 'pink' }}>1</span>]
					</span>
				),
				arguments: [
					[
						'Loop ID',
						'Optional Number - ID of Specific Loop',
						'1',
						'Leaving Loop ID will clear all',
					],
				],
			},
			clearWait: {
				id: 'clearWait',
				sideTitle: 'clearWait',
				title: 'AnimateEngine (Bars)   -   clearWait',
				desc:
					'WARNING: NOT FUNCTIONAL clearWait is used to stop delays (timeouts).',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearWait'
						</span>
						,<span style={{ color: 'pink' }}>Wait ID?</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearWait'
						</span>
						,<span style={{ color: 'pink' }}>1</span>]
					</span>
				),
				arguments: [
					[
						'Wait ID',
						'Optional Number - ID of Specific Wait',
						'1',
						'Leaving Wait ID will clear all',
					],
				],
			},
			clearTimers: {
				id: 'clearTimers',
				sideTitle: 'clearTimers',
				title: 'AnimateEngine (Bars)   -   clearTimers',
				desc:
					'WARNING: NOT FUNCTIONAL clearTimers is used to stop delays (timeouts) and loops (intervals).',
				alias: 'ct',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearTimers'
						</span>
						]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'clearTimers'
						</span>
						]
					</span>
				),
				arguments: [['N/A', 'N/A', 'N/A', 'N/A']],
			},
			reload: {
				id: 'reload',
				sideTitle: 'reload',
				title: 'AnimateEngine (Bars)   -   reload',
				desc: 'reload is used to reload the page.',
				alias: 'r',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'reload'
						</span>
						]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'reload'
						</span>
						]
					</span>
				),
				arguments: [['N/A', 'N/A', 'N/A', 'N/A']],
			},
			version: {
				id: 'version',
				sideTitle: 'version',
				title: 'AnimateEngine (Bars)   -   version',
				desc: 'version returns the current version of AlgoV.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'version'
						</span>
						]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'version'
						</span>
						]
					</span>
				),
				arguments: [['N/A', 'N/A', 'N/A', 'N/A']],
			},
			defaultColor: {
				id: 'defaultColor',
				sideTitle: 'defaultColor',
				title: 'AnimateEngine (Bars)   -   defaultColor',
				desc:
					'defaultColor is used to change the default colors used by algorithms in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'defaultColor'
						</span>
						,[<span style={{ color: 'pink' }}>Variable Name</span>],{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'defaultColor'
						</span>
						,[<span style={{ color: 'pink' }}>'BASE'</span>],{' '}
						<span style={{ color: 'turquoise' }}>'red'</span>]
					</span>
				),
				arguments: [
					[
						'Varaible Name',
						'String',
						"'BASE'",
						'Standard Variables: BASE, CHECKING, DONE',
					],
					['Color', 'CSS Color Value', '"red"', ['None']],
				],
			},
			executeInternalAnimation: {
				id: 'executeInternalAnimation',
				sideTitle: 'executeInternalAnimation',
				title: 'AnimateEngine (Bars)   -   executeInternalAnimation',
				desc:
					'executeInternalAnimation is used to run a default animation in the Bar Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'executeInternalAnimation'
						</span>
						,<span style={{ color: 'pink' }}>Animation Code</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'executeInternalAnimation'
						</span>
						,<span style={{ color: 'pink' }}>"heapSort"</span>]
					</span>
				),
				arguments: [
					[
						'Animation Code',
						'String',
						'heapSort',
						'Algorithm Codes: bubbleSort, selectionSort, insertionSort, heapSort etc.',
					],
				],
			},
			do: {
				id: 'do',
				sideTitle: 'do',
				title: 'AnimateEngine (Bars)   -   do',
				desc: 'do is used to run multiple commands every given interval.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'do'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Commands</span>],{' '}
						<span style={{ color: 'turquoise' }}>Interval</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'do'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>],{' '}
						<span style={{ color: 'turquoise' }}>1000</span>]
					</span>
				),
				arguments: [
					[
						'Array of Commands',
						'Array with AnimateEngine Commands',
						'[["setColor",[0],"red"]]',
						'None',
					],
					[
						'Interval',
						'Number in m/s',
						'1000',
						['Interval of 0 performs all commands simulteneously'],
					],
				],
			},
			doIn: {
				id: 'doIn',
				sideTitle: 'doIn',
				title: 'AnimateEngine (Bars)   -   doIn',
				desc: 'doIn is used to run multiple commands after given time.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doIn'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Commands</span>],{' '}
						<span style={{ color: 'turquoise' }}>Wait Time</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doIn'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>],{' '}
						<span style={{ color: 'turquoise' }}>1000</span>]
					</span>
				),
				arguments: [
					[
						'Array of Commands',
						'Array with AnimateEngine Commands',
						'[["setColor",[0],"red"]]',
						'None',
					],
					['Wait Time', 'Number in m/s', '1000', ['None']],
				],
			},
			doSim: {
				id: 'doSim',
				sideTitle: 'doSim',
				title: 'AnimateEngine (Bars)   -   doSim',
				desc:
					'doSim is an abstracted command based on do used to run multiple commands simulteneously.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doSim'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Commands</span>]]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doSim'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>]
					</span>
				),
				arguments: [
					[
						'Array of Commands',
						'Array with AnimateEngine Commands',
						'[["setColor",[0],"red"]]',
						'None',
					],
				],
			},
			doFor: {
				id: 'doFor',
				sideTitle: 'doFor',
				title: 'AnimateEngine (Bars)   -   doFor',
				desc:
					'doFor is used to run multiple commands simulteneously for a given number of time every given interval.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doFor'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Commands</span>],{' '}
						<span style={{ color: 'turquoise' }}>Number Of Repeats</span>,{' '}
						<span style={{ color: 'gold' }}>Interval</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doFor'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>],{' '}
						<span style={{ color: 'turquoise' }}>2</span>,{' '}
						<span style={{ color: 'gold' }}>1000</span>]{' '}
					</span>
				),
				arguments: [
					[
						'Array of Commands',
						'Array with AnimateEngine Commands',
						'[["setColor",[0],"red"]]',
						'None',
					],
					['Repeats', 'Number', '2', ['Number of 0 runs infinitely ']],
					[
						'Interval',
						'Number in m/s',
						'1000',
						['Interval of 0 performs all commands simulteneously'],
					],
				],
			},
		},
	},
};

export default data;
