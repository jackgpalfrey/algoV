import React, {useState} from 'react'
import './style.css'

function Item(props){
    const [isOpen, setIsOpen] = useState(false)


    let ItemInfo = (
        <div className='itemInfoContainer'>
            {props.children}
        </div>
    )

    return (
        <div className='fullItemContainer'>
            <div className='TitleContainer' onClick={() => setIsOpen(!isOpen)}>
                <p>{props.version}</p>
                <p>{props.title}</p>
            </div>
            {isOpen ? ItemInfo : null}
        </div>
    )
    
}


export default Item