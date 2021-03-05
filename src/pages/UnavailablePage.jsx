import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './UnavailablePageStyle.css'
function InDevPage(props){
    let history = useHistory()
    console.log(history)
    return (
        <div className='inDevPage'>
            <div className='InDevDiv'>
                <i className="material-icons no-icon">not_interested</i>
                <h1 className='inDevPageh1'>{`${history.location.pathname} is unavailable`}</h1>
                <p className='inDevPagep'>This page does not exist or is under maintanence. Check back again later.</p>
                <Link to='/'><span className='inDevGoHomeLink'>Go Home</span></Link>
            </div>
            
        </div>

    )
}

export default InDevPage