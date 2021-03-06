import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'
import vars from '../../data/vars.json'


function Menu(props){
    const [isOpen, setIsOpen] = useState(false)

    function handleScroll(){
        setIsOpen(false)
    }

    useEffect(() => {
        
        document.addEventListener('scroll',handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
    
    return (
        <div>
        {/* {<div className='hoverToOpen' onMouseEnter={() => {console.log(true)}}></div> */}
        {isOpen ? <div className='background-layer' onScroll={() => {setIsOpen(false)}} onClick = {() => {setIsOpen(false)}}></div> : null}
        <div className={isOpen ? 'menuCard': 'menuCard closed'} /*onMouseEnter={() => {setIsOpen(true)}} onMouseLeave={() => {setIsOpen(false)}}*/>
            
            <br />
            <br />
            <button onClick={() => setIsOpen(!isOpen)} className='openMenuButton' >
                {isOpen ? <i className="material-icons ">menu_open</i> : <i className="material-icons ">menu</i> }
            </button>
            {isOpen ? [<NavLink exact className='link homeButton' activeClassName='current' to='/'><span title='Home'><i className="material-icons item">home</i></span></NavLink>,
                       <NavLink className='link' activeClassName='current' to='/bars'><span title='Bars'><i className="material-icons item">bar_chart</i></span></NavLink>,
                       <NavLink className='link unavailable' activeClassName='current' to='/grid'><span title='Grid'><i className="material-icons item">window</i></span></NavLink>,
                       <NavLink className='link unavailable' activeClassName='current' to='/logic'><span title='Logic'><i className="material-icons item">device_hub</i></span></NavLink>,
                       <NavLink className='link unavailable' activeClassName='current' to='/learn'><span title='Learn'><i className="material-icons item">class</i></span></NavLink>, 
                       <NavLink className='link unavailable' activeClassName='current' to='/puzzles'><span title='Puzzles'><i className="material-icons item">extension</i></span></NavLink>] 
                       : null}

            {isOpen && props.isLoggedIn ? <NavLink className='link unavailable' activeClassName='current' to='/settings'><span title='Settings & Logout'><i className="material-icons item">settings</i></span></NavLink> : null}
            {isOpen && !props.isLoggedIn ? <NavLink className='link unavailable' activeClassName='current' to='/login'><span className='login' title='Login'>Login</span></NavLink> : null}

            
            
        </div>
        </div>
    )
}

export default Menu