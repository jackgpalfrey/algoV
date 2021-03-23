import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import vars from '../../data/vars.json';

import getLocaleText from '../../util/getLocaleText';
const text = getLocaleText('general').menu;

function Menu(props) {
	const [isOpen, setIsOpen] = useState(false);

	function handleScroll() {
		setIsOpen(false);
	}

	useEffect(() => {
		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div>
			{isOpen ? (
				<div
					className='background-layer'
					onScroll={() => {
						setIsOpen(false);
					}}
					onClick={() => {
						setIsOpen(false);
					}}
				></div>
			) : null}
			<div className={isOpen ? 'menuCard' : 'menuCard closed'}>
				<br />
				<br />
				<button onClick={() => setIsOpen(!isOpen)} className='openMenuButton'>
					<i className='material-icons clickable dark'>
						{isOpen ? 'menu_open' : 'menu'}
					</i>
				</button>
				<div className='menuLinkContainer'>
					{isOpen
						? [
								<NavLink
									exact
									className='link clickable homeButton'
									activeClassName='current'
									to='/'
								>
									<span className='menuItem' title={text.home}>
										<i className='material-icons item'>home</i>
										<span className='menuText'>{text.home}</span>
									</span>
								</NavLink>,
								<NavLink
									className='link clickable'
									activeClassName='current'
									to='/bars'
								>
									<span className='menuItem' title={text.bars}>
										<i className='material-icons item'>bar_chart</i>
										<span className='menuText'>{text.bars}</span>
									</span>
								</NavLink>,
								<NavLink
									className='link clickable'
									activeClassName='current'
									to='/grid'
								>
									<span className='menuItem' title={text.grid}>
										<i className='material-icons item'>window</i>
										<span className='menuText'>{text.grid}</span>
									</span>
								</NavLink>,
								<NavLink
									className='link clickable unavailable'
									activeClassName='current'
									to='/logic'
								>
									<span className='menuItem' title={text.logic}>
										<i className='material-icons item'>device_hub</i>
										<span className='menuText'>{text.logic}</span>
									</span>
								</NavLink>,
								<NavLink
									className='link clickable unavailable'
									activeClassName='current'
									to='/learn'
								>
									<span className='menuItem' title={text.learn}>
										<i className='material-icons item'>class</i>
										<span className='menuText'>{text.learn}</span>
									</span>
								</NavLink>,
								<NavLink
									className='link clickable unavailable'
									activeClassName='current'
									to='/puzzles'
								>
									<span className='menuItem' title={text.challenges}>
										<i className='material-icons item'>extension</i>
										<span className='menuText'>{text.challenges}</span>
									</span>
								</NavLink>,
						  ]
						: null}

					{isOpen && props.isLoggedIn ? (
						<NavLink
							className='link unavailable'
							activeClassName='current'
							to='/settings'
						>
							<span className='menuItem' title={text.settings}>
								<i className='material-icons item'>settings</i>
								<span className='menuText'>{text.settings}</span>
							</span>
						</NavLink>
					) : null}
					{isOpen && !props.isLoggedIn ? (
						<NavLink
							className='link unavailable'
							activeClassName='current'
							to='/login'
						>
							<span className='login' title={text.login}>
								{text.login}
							</span>
						</NavLink>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Menu;
