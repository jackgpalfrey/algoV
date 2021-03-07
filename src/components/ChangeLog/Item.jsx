import React, {useEffect, useState} from 'react'
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

function Item(props){
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])
    


    let changes = false

    if (props.changes){
        changes = props.changes.map((value, idx) => {
            return (<li className='changeEntry' ><span style={{backgroundColor: `${CHANGES_COLORS[value[0]]}`}} className='changelog-label'>{value[0]}</span> - {value[1]}</li>)
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
            <div onClick={() => setIsOpen(!isOpen)} className='TitleContainer' >
                <p className='version'>{props.version}</p>
                <p className='changeLog-title'>{props.title}</p>
            </div>
            {isOpen ? ItemInfo : null}
        </div>
    )
    
}


export default Item