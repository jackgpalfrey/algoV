import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import icon from '../../images/icon.png';
import { Link } from 'react-router-dom';

import getLocaleText from '../../util/getLocaleText';
const docData = getLocaleText('docs');
const text = getLocaleText('general').docsPage;

function DocsPage() {
	let firstItem = 'General-Introduction';
	let firstOpenTabs = ['General'];
	let urlItem = useLocation().search.replace('?', '');
	if (urlItem) {
		firstItem = urlItem;
		firstOpenTabs.push(urlItem.split('-')[0]);
	}
	const [openItem, setOpenItem] = useState(firstItem);
	const [openTabs, setOpenTabs] = useState(firstOpenTabs);
	const [search, setSearch] = useState('');
	let searchRef = useRef(null);

	let itemKey = openItem.split('-');
	let data = docData[itemKey[0]].pages[itemKey[1]];

	useEffect(() => {
		searchRef.current.focus();
	}, []);

	function createRows() {
		let table = [];

		for (let i = 0; i < data.arguments.length; i++) {
			let arg = data.arguments[i];
			let argRow = [];
			argRow.push(<td>{arg[0]}</td>);
			argRow.push(<td>{arg[1]}</td>);
			argRow.push(<td>{arg[2]}</td>);
			argRow.push(<td>{arg[3]}</td>);

			table.push(<tr>{argRow}</tr>);
		}

		return table;
	}

	function createSideBar() {
		let sections = Object.values(docData);
		let sideBarHTML = sections.map((value, index) => {
			let pages = Object.values(value.pages);
			let items = pages.map((pageObj) => {
				let activeItemKey = openItem.split('-');
				let classes = 'docsPage-sideBarItem clickable';
				if (value.id === activeItemKey[0] && pageObj.id === activeItemKey[1])
					classes += ' docsPage-sideBarItem-selected';
				if (
					search[0] === '?' &&
					!pageObj.sideTitle
						.toLowerCase()
						.includes(`${search.substring(1).toLowerCase()}`)
				)
					classes += ' docsPage-sideBarItem-hidden';
				if (
					search[0] === ':' &&
					!pageObj.sideTitle
						.toLowerCase()
						.includes(`${search.substring(1).toLowerCase()}`) &&
					!pageObj.title
						.toLowerCase()
						.includes(`${search.substring(1).toLowerCase()}`) &&
					!pageObj.desc
						.toLowerCase()
						.includes(`${search.substring(1).toLowerCase()}`)
				)
					classes += ' docsPage-sideBarItem-hidden';
				if (
					search[0] !== '?' &&
					search[0] !== ':' &&
					!pageObj.sideTitle.toLowerCase().startsWith(`${search.toLowerCase()}`)
				)
					classes += ' docsPage-sideBarItem-hidden';
				return (
					<div
						onClick={() => {
							setOpenItem(`${value.id}-${pageObj.id}`);
						}}
						className={classes}
					>
						{pageObj.sideTitle}
					</div>
				);
			});
			return (
				<>
					<div className='docsPage-sidebar-section'>
						<div
							onClick={() => {
								if (openTabs.includes(value.id)) {
									setOpenTabs((prevState) => {
										let curOpenTabs = prevState.slice();
										curOpenTabs.splice(curOpenTabs.indexOf(value.id));
										return curOpenTabs;
									});
								} else {
									setOpenTabs((prevState) => {
										let curOpenTabs = prevState.slice();
										curOpenTabs.push(value.id);
										return curOpenTabs;
									});
								}
							}}
							className='docsPage-sideBarTitle clickable'
						>
							{value.name}
						</div>
						{openTabs.includes(value.id) || search !== '' ? items : null}
					</div>
				</>
			);
		});

		return [sideBarHTML];
	}

	function createTable() {
		return (
			<table className='arguments'>
				<tr>
					<th>{text.tableArgumentsTitle}</th>
					<th>{text.tableTypeTitle}</th>
					<th>{text.tableExamplesTitle}</th>
					<th>{text.tableNotesTitle}</th>
				</tr>
				{createRows()}
			</table>
		);
	}
	return (
		<div className='docsPage-container'>
			<div className='docsPage-titleBar'>
				<Link to='/'>
					<img
						className='docspage-img'
						src={icon}
						alt='AlgoV'
						width='80'
						height='40'
					/>
				</Link>
				{` ${text.titleText}`}
			</div>
			<div className='docsPage-mainContent'>
				<div className='docsPage-mainContent-container'>
					<h1 className='docsPage-mainContent-h1'>{data.title}</h1>
					<hr />
					<p className='docsPage-mainContent-description'>{data.desc}</p>
					<br />
					{data.syntaxHTML ? (
						<p className='docsPage-mainContent-example-title docsPage-mainContent-example-container'>
							{`${text.mainContentSyntaxLabel} `}
							<span className='docsPage-mainContent-example'>
								{data.syntaxHTML}
							</span>
						</p>
					) : null}
					{data.exampleHTML ? (
						<p className='docsPage-mainContent-example-container'>
							<span className='docsPage-mainContent-example-title'>
								{`${text.mainContentExampleLabel} `}{' '}
							</span>
							<span className='docsPage-mainContent-example'>
								{data.exampleHTML}
							</span>
						</p>
					) : null}
					{data.arguments ? createTable() : null}
				</div>
			</div>
			<div className='docsPage-sideBar'>
				<div className='docsPage-sidebar-container'>
					<div className='docsPage-sidebar-section'>
						<input
							ref={searchRef}
							className='docsPage-sidebar-search'
							placeholder={text.searchPlaceholder}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</div>
					{[createSideBar()]}
				</div>
			</div>
		</div>
	);
}

export default DocsPage;
