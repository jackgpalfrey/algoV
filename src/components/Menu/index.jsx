import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'


function Menu(){
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div>
        {/* {<div className='hoverToOpen' onMouseEnter={() => {console.log(true)}}></div> */}
        {isOpen ? <div className='background-layer' onClick = {() => {setIsOpen(false)}}></div> : null}
        <div className={isOpen ? 'menuCard': 'menuCard closed'} /*onMouseEnter={() => {setIsOpen(true)}} onMouseLeave={() => {setIsOpen(false)}}*/>
            
            <br />
            <br />
            <button onClick={() => setIsOpen(!isOpen)} className='openMenuButton' >
                {isOpen ? <i className="material-icons ">menu_open</i> : <i className="material-icons ">menu</i> }
            </button>
            {isOpen ? [<NavLink exact className='link' activeClassName='current' to='/'><span title='Home'><i className="material-icons item">home</i></span></NavLink>,
                       <NavLink className='link' activeClassName='current' to='/sort'><span title='Sorting Visualiser'><i className="material-icons item">bar_chart</i></span></NavLink>,
                       <NavLink className='link unavailable' activeClassName='current' to='/pathfind'><span title='Pathfinding Visualiser'><i className="material-icons item">directions</i></span></NavLink>,
                       <NavLink className='link unavailable' activeClassName='current' to='/compute'><span title='Algori Compute'><i className="material-icons item">functions</i></span></NavLink>] 
                       : null}

            
            
        </div>
        </div>
    )
}

export default Menu