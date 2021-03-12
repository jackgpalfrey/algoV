import React, {useEffect, useState} from 'react'
import './style.css'

import getLocaleText from '../../util/getLocaleText'
const text = getLocaleText('general').changelog

const CHANGES_COLORS = {
    // Finished Changes
    "ADDED": "#1b9429",
    "CHANGED": "#2b6bba",
    "DEPRECATED": "#a6602b",
    "REMOVED": "#a62b2b",
    "FIXED": "#106d75",
    "GENERAL": "#e0b53d",
    // Planned Changes
    "ADD": "#1b9429",
    "CHANGE": "#2b6bba",
    "DEPRECATE": "#a6602b",
    "REMOVE": "#a62b2b",
    "FIX": "#218f7c"
}


const CHANGES_TEXT = {
    // Finished Changes
    "ADDED": text.addedLabel,
    "CHANGED": text.changedLabel,
    "DEPRECATED": text.deprecatedLabel,
    "REMOVED": text.removedLabel,
    "FIXED": text.fixedLabel,
    "GENERAL": text.generalLabel,
    // Planned Changes
    "ADD": "ADD",
    "CHANGE": "#CHANGE",
    "DEPRECATE": "DEPRECATE",
    "REMOVE": "REMOVE",
    "FIX": "FIX"
}

function Item(props){
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])
    


    let changes = false

    if (props.changes){
        changes = props.changes.map((value, idx) => {
            return (<li className='changeEntry' ><span style={{backgroundColor: `${CHANGES_COLORS[value[0]]}`}} className='changelog-label'>{CHANGES_TEXT[value[0]]}</span> - {value[1]}</li>)
        })
    }

    let ItemInfo = (
        <div className='itemInfoContainer'>
            {props.children}
            <br />
            {changes ? <ul className='changesList'>{changes}</ul> : null}
            <p className='date'>{props.date || 'Unknown'}</p>
        </div>
    )

    return (
        <div className='fullItemContainer'>
            <div onClick={() => setIsOpen(!isOpen)} className='TitleContainer clickable' >
                <p className='version'>{props.version}</p>
                <p className='changeLog-title'>{props.title}</p>
            </div>
            {isOpen ? ItemInfo : null}
        </div>
    )
    
}


export default Item