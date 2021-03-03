import React, { useState } from 'react'
import './InDevPageStyle.css'
function InDevPage(props){
    return (
        <div className='inDevPage'>
            <h1 className='inDevPageh1'>This page is currently in development</h1>
            <p className='inDevPagep'>This page is currently under development or maintanence and therefore unavailable. Check back again later.</p>
        </div>

    )
}

export default InDevPage