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
					'Welcome To AlgoV Docs. Click On The Sections To The Left to see the relevant pages. When using search normally items are compared with your search based on its first characters. However if you preface your search with a ? it will look for your search anywhere in the page titles or you can use a : to search titles and descriptions',
			},
		},
	},
	AnimateEngineBars: {
		id: 'AnimateEngineBars',
		name: 'AnimateEngine (Bars)',
		pages: {
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
						,<span style={{ color: 'pink' }}>Variable Name</span>,{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'defaultColor'
						</span>
						,<span style={{ color: 'pink' }}>'BASE'</span>,{' '}
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
						,[<span style={{ color: 'pink' }}>Array of Commands</span>]]]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doSim'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>]]
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
						,<span style={{ color: 'pink' }}>[Array of Values]</span>,{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setArray'
						</span>
						,<span style={{ color: 'pink' }}>[1,2,18,22,55,16]</span>,{' '}
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
						,<span style={{ color: 'pink' }}>[Array of Indexes]</span>,{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setColor'
						</span>
						,<span style={{ color: 'pink' }}>[1,2,-1,'$MID']</span>,{' '}
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
						,<span style={{ color: 'pink' }}>[Array of Indexes]</span>,{' '}
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
						,<span style={{ color: 'pink' }}>[1,2,-1,'$MID']</span>,{' '}
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
						,<span style={{ color: 'pink' }}>[Array of Indexes]</span>,{' '}
						<span style={{ color: 'turquoise' }}>Value</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setValue'
						</span>
						,<span style={{ color: 'pink' }}>[1,2,-1,'$MID']</span>,{' '}
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
			},
		},
	},
	AnimateEngineGrid: {
		id: 'AnimateEngineGrid',
		name: 'AnimateEngine (Grid)',
		pages: {
			clearLoop: {
				id: 'clearLoop',
				sideTitle: 'clearLoop',
				title: 'AnimateEngine (Grid)   -   clearLoop',
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
			clearTimers: {
				id: 'clearTimers',
				sideTitle: 'clearTimers',
				title: 'AnimateEngine (Grid)   -   clearTimers',
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
			},
			clearWait: {
				id: 'clearWait',
				sideTitle: 'clearWait',
				title: 'AnimateEngine (Grid)   -   clearWait',
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
			defaultColor: {
				id: 'defaultColor',
				sideTitle: 'defaultColor',
				title: 'AnimateEngine (Grid)   -   defaultColor',
				desc:
					'defaultColor is used to change the default colors used by algorithms in the Grid Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'defaultColor'
						</span>
						,<span style={{ color: 'pink' }}>Variable Name</span>,{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'defaultColor'
						</span>
						,<span style={{ color: 'pink' }}>'BASE'</span>,{' '}
						<span style={{ color: 'turquoise' }}>'red'</span>]
					</span>
				),
				arguments: [
					[
						'Varaible Name',
						'String',
						"'BASE'",
						'Standard Variables: BASE, CHECKING, ROUTE, NEXT',
					],
					['Color', 'CSS Color Value', '"red"', ['None']],
				],
			},
			do: {
				id: 'do',
				sideTitle: 'do',
				title: 'AnimateEngine (Grid)   -   do',
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
			doFor: {
				id: 'doFor',
				sideTitle: 'doFor',
				title: 'AnimateEngine (Grid)   -   doFor',
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
			doIn: {
				id: 'doIn',
				sideTitle: 'doIn',
				title: 'AnimateEngine (Grid)   -   doIn',
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
				title: 'AnimateEngine (Grid)   -   doSim',
				desc:
					'doSim is an abstracted command based on do used to run multiple commands simulteneously.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doSim'
						</span>
						,[<span style={{ color: 'pink' }}>Array of Commands</span>]]]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'doSim'
						</span>
						,[<span style={{ color: 'pink' }}>["setColor",[0],"red"]</span>]]
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
			endAnimation: {
				id: 'endAnimation',
				sideTitle: 'endAnimation',
				title: 'AnimateEngine (Grid)   -   endAnimation',
				desc:
					'endAnimation is used to "stop an animation" and reallow user input in the Grid Visualiser.',
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
			},
			executeInternalAnimation: {
				id: 'executeInternalAnimation',
				sideTitle: 'executeInternalAnimation',
				title: 'AnimateEngine (Grid)   -   executeInternalAnimation',
				desc:
					'executeInternalAnimation is used to run a default animation in the Grid Visualiser.',
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
						,<span style={{ color: 'pink' }}>"pathfind-a*"</span>]
					</span>
				),
				arguments: [
					['Animation Code', 'String', 'pathfind-a*', 'Algorithm Codes: TBD'],
				],
			},
			reload: {
				id: 'reload',
				sideTitle: 'reload',
				title: 'AnimateEngine (Grid)   -   reload',
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
			},
			resetArray: {
				id: 'resetArray',
				sideTitle: 'resetArray',
				title: 'AnimateEngine (Grid)   -   resetArray',
				desc:
					'resetArray is an abstracted command based on setArray used to reset the grid in the Grid Visualiser to nothing.',
				alias: 'ra',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'resetArray'
						</span>
						,<span style={{ color: 'pink' }}>Number of Nodes?</span>]
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
						'Number of Nodes',
						'Optional number',
						'32',
						'Leaving Number of nodes Out will reset array to number of nodes set by the user',
					],
				],
			},
			setArray: {
				id: 'setArray',
				sideTitle: 'setArray',
				title: 'AnimateEngine (Grid)   -   setArray',
				desc:
					'setArray is used to change the entire array to the given values in the Grid Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setArray'
						</span>
						,<span style={{ color: 'pink' }}>[Array of Nodes]</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setArray'
						</span>
						,
						<span style={{ color: 'pink' }}>
							[{`{color: 'red', type: 'open', tr: 32, tl: 12, br: '', bl: ''}`}]
						</span>
						]
					</span>
				),
				arguments: [
					[
						'Array of Nodes',
						'Array with objects',
						"{color: 'red', type: 'open', tr: 32, tl: 12, br: '', bl: '', onHover: ''}",
						'Node Data: color - Color of square, type - Type of Square (eg. WALL, START, END, WEIGHT<1> etc, tl,tr,br,bl,onHover - Text of related locations eg. Top Left ',
					],
				],
			},
			setColor: {
				id: 'setColor',
				sideTitle: 'setColor',
				title: 'AnimateEngine (Grid)   -   setColor',
				desc:
					'setColor is an abstracted command based on setState used to change the color of Nodes in the Grid Visualiser.',
				alias: 'sc',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setColor'
						</span>
						,<span style={{ color: 'pink' }}>[Array of Coords]</span>,{' '}
						<span style={{ color: 'turquoise' }}>Color</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setColor'
						</span>
						,<span style={{ color: 'pink' }}>[[0,1],[1,2],[3,-1],'$MID']</span>,{' '}
						<span style={{ color: 'turquoise' }}>'red'</span>]
					</span>
				),
				arguments: [
					[
						'Array of Indexes',
						'Array with numbers or Index Variables',
						'[[0,1],[1,2],[3,-1],"$MID"]',
						'Negative Numbers reference from the last node on the respective axis. Available Index Variables: $ALL, $TLQUAD, $TRQUAD, $BLQUAD, $BRQUAD, $MID, $ODD, $EVEN',
					],
					[
						'Color',
						'CSS Color Value OR Color Variable',
						'"red" / "$CHECKING"',
						['Available Color Varaibles: $BASE, $CHECKING, $ROUTE, $NEXT'],
					],
				],
			},
			setComparisonsDisplay: {
				id: 'setComparisonsDisplay',
				sideTitle: 'setComparisonsDisplay',
				title: 'AnimateEngine (Grid)   -   setComparisonsDisplay',
				desc:
					'setComparisonsDisplay is use to set the comparisons display in the Grid Visualiser.',
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
			setRuntimeDisplay: {
				id: 'setRuntimeDisplay',
				sideTitle: 'setRuntimeDisplay',
				title: 'AnimateEngine (Grid)   -   setRuntimeDisplay',
				desc:
					'setRuntimeDisplay is use to set the runtime display in the Grid Visualiser.',
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
			setState: {
				id: 'setState',
				sideTitle: 'setState',
				title: 'AnimateEngine (Grid)   -   setState',
				desc:
					'setState is used to manipulate the state of Nodes in the Grid Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setState'
						</span>
						,<span style={{ color: 'pink' }}>[Array of Coords]</span>,{' '}
						<span style={{ color: 'turquoise' }}>
							Type of data (color/type/tr/tl/br/bl/onHover)
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
						,<span style={{ color: 'pink' }}>[[0,1],[0,2],[-5,-1],'$MID']</span>
						, <span style={{ color: 'turquoise' }}>'color'</span>,{' '}
						<span style={{ color: 'gold' }}>'red'</span>]{' '}
					</span>
				),
				arguments: [
					[
						'Array of Indexes',
						'Array with numbers or Index Variables',
						'[1,2,-1,"$MID"]',
						'Negative Numbers reference from the last node on the respective axis. Available Index Variables: $ALL, $TLQUAD, $TRQUAD, $BLQUAD, $BRQUAD, $MID, $ODD, $EVEN',
					],
					['Type of data', 'String (Value / Color)', '"color"', ['None']],
					[
						'Data',
						'(Color) CSS Color Value OR Color Variable / (Type) String / (tr,tl,br,bl,onHover) String',
						'"red" / "$CHECKING" / 10',
						[
							'Available Color Varaibles: $BASE, $CHECKING, $ROUTE, $NEXT. Available Types: WALL, START, END, WEIGHT<1> etc.',
						],
					],
				],
			},
			setSwapsDisplay: {
				id: 'setSwapsDisplay',
				sideTitle: 'setSwapsDisplay',
				title: 'AnimateEngine (Grid)   -   setSwapsDisplay',
				desc:
					'setSwapsDisplay is use to set the swaps display in the Grid Visualiser.',
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
			setText: {
				id: 'setText',
				sideTitle: 'setText',
				title: 'AnimateEngine (Grid)   -   setText',
				desc:
					'setText is used to manipulate the text of Nodes in the Grid Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setText'
						</span>
						,<span style={{ color: 'pink' }}>[Array of Coords]</span>,{' '}
						<span style={{ color: 'turquoise' }}>
							Text Position (tr/tl/br/bl/onHover)
						</span>
						, <span style={{ color: 'gold' }}>Value</span>,
						<span style={{ color: 'green' }}>Color?</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setText'
						</span>
						,<span style={{ color: 'pink' }}>[[0,1],[0,2],[-5,-1],'$MID']</span>
						, <span style={{ color: 'turquoise' }}>'tl'</span>,{' '}
						<span style={{ color: 'gold' }}>10</span>,
						<span style={{ color: 'green' }}>'red'</span>]{' '}
					</span>
				),
				arguments: [
					[
						'Array of Coords',
						'Array with numbers or Index Variables',
						'[[0,1],[0,2],[-5,-1],"$MID"]',
						'Negative Numbers reference from the last node on the respective axis. Available Index Variables: $ALL, $TLQUAD, $TRQUAD, $BLQUAD, $BRQUAD, $MID, $ODD, $EVEN',
					],
					['Text Position', 'String (tr/tl/br/bl/onHover)', '"tl"', ['None']],
					['Value', 'String', '10', [,]],
					[
						'Color',
						'Optional String',
						'"red"',
						['Available Color Varaibles: $BASE, $CHECKING, $ROUTE, $NEXT.'],
					],
				],
			},
			setType: {
				id: 'setType',
				sideTitle: 'setType',
				title: 'AnimateEngine (Grid)   -   setType',
				desc:
					'setType is an abstracted command based on setState used to change the type of Nodes in the Grid Visualiser.',
				syntaxHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setValue'
						</span>
						,<span style={{ color: 'pink' }}>[Array of Coords]</span>,{' '}
						<span style={{ color: 'turquoise' }}>Type</span>]
					</span>
				),
				exampleHTML: (
					<span>
						[
						<span className='docsPage-mainContent-exampleStyle-command'>
							'setValue'
						</span>
						,<span style={{ color: 'pink' }}>[[0,1],[0,2],[-8,-1],"$MID"]</span>
						, <span style={{ color: 'turquoise' }}>"WALL"</span>]
					</span>
				),
				arguments: [
					[
						'Array of Coords',
						'Array with Coords or Index Variables',
						'[[0,1],[0,2],[-8,-1],"$MID"]',
						'Negative Numbers reference from the last node on the respective axis. Available Index Variables: $ALL, $TLQUAD, $TRQUAD, $BLQUAD, $BRQUAD, $MID, $ODD, $EVEN',
					],
					[
						'Type',
						'String',
						'"WALL"',
						'Available Types: WALL, START, END, WEIGHT<1>',
					],
				],
			},
			startAnimation: {
				id: 'startAnimation',
				sideTitle: 'startAnimation',
				title: 'AnimateEngine (Grid)   -   startAnimation',
				desc:
					'startAnimation is used to "start an animation" and block user input in the Grid Visualiser.',
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
			},
			version: {
				id: 'version',
				sideTitle: 'version',
				title: 'AnimateEngine (Grid)   -   version',
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
			},
		},
	},
};

export default data;
