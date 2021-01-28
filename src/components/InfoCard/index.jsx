import React, { useState } from 'react'
import './style.css'
import data from '../../data/algorithmInfo.json'
import { setOriginalNode } from 'typescript'


function InfoCard({algorithmType, algorithmID}){
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenHover, setIsOpenHover] = useState(false)
    
    console.log('INFO')

    let title = 'No Information Available'
    let complexity = ''
    let descriptionArray = []
    let creditText = ''
    let credit = ''

    if (data[algorithmType][algorithmID]){
        title = data[algorithmType][algorithmID].title
        complexity = data[algorithmType][algorithmID].avgTimeComplexity
        descriptionArray = data[algorithmType][algorithmID].description.split('\n')
        creditText = data[algorithmType][algorithmID].creditText || 'Description From'
        credit = data[algorithmType][algorithmID].credit
    }
    

    let card = (<div className='card' onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}>
                    <p className='title'>{title}</p>
                    <hr></hr>
                    <p className='meta'>{`Average Time Complexity: ${complexity}`}</p>
                    <hr></hr>
                    {descriptionArray.map((item,idx) => <p className='description'>{item}</p>)}
                    {credit ? <a className='credit' href={credit} >{`${creditText}: ${credit}`}</a> : null}     
                </div>)
    return (
            <div className='card-container' onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)} >
                {isOpen || isOpenHover ? card : null}
                <button onClick={() => setIsOpen(!isOpen)} className='openCardButton' >
                {isOpen ? <i className="material-icons ">close</i> : <i className="material-icons ">info</i> }
                </button>  
            </div>
            )

    }

export default InfoCard