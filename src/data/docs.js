const data = {
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
		},
	},
};

export default data;
