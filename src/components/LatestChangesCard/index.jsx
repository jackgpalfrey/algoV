import React from 'react'
import './style.css'

const CHANGES_COLORS = {
    // Finished Changes
    "ADDED": "#1b9429",
    "CHANGED": "#2b6bba",
    "DEPRECATED": "#a6602b",
    "REMOVED": "#a62b2b",
    "FIXED": "#218f7c",
    "GENERAL": "#e0b53d",
    // Planned Changes
    "ADD": "#1b9429",
    "CHANGE": "#2b6bba",
    "DEPRECATE": "#a6602b",
    "REMOVE": "#a62b2b",
    "FIX": "#218f7c"
}


function LatestChangesCard(props){
    let changes = false
    if (props.changes){
        changes = props.changes.map((value, idx) => {
            return (<li style={{color: `${CHANGES_COLORS[value[0]]}`}}>{value[0]} - {value[1]}</li>)
        })
    }

    let ItemInfo = (
        <div className='latest-itemInfoContainer'>
            {props.children}
            {changes ? <ul className='changesList'>{changes}</ul> : null}
            <p className='date'>{props.date || 'Unknown'}</p>
        </div>
    )


    return (
        <div className='latest-background' onClick={() => props.closeFunc(false)}>
            <div className='latest-fullItemContainer'>
                <div className='latest-TitleContainer' >
                    <p className='version'>{`${props.version}  -  ${props.title}`}</p>
                    <i onClick={() => {props.closeFunc(false)}} className="material-icons latest-close">close</i>
                </div>
                {ItemInfo}
            </div>
        </div>
    )
}

export default LatestChangesCard