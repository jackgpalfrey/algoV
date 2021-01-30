import React, { useState } from 'react'
import './style.css'
import data from '../../data/algorithmInfo.json'
import { setOriginalNode } from 'typescript'


function InfoCard({algorithmType, algorithmID}){
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenHover, setIsOpenHover] = useState(false)
    
    console.log('INFO')

    let title = 'No Information Available'
    let avgTimeComplexity = ''
    let worstTimeComplexity = ''
    let bestTimeComplexity  = ''
    let memoryComplexity = ''
    let stable = ''
    let descriptionArray = []
    let creditText = ''
    let credit = ''

    if (data[algorithmType][algorithmID]){
        title = data[algorithmType][algorithmID].title || 'Unknown'
        avgTimeComplexity = data[algorithmType][algorithmID].avgTimeComplexity || 'Unknown'
        worstTimeComplexity = data[algorithmType][algorithmID].worstTimeComplexity || 'Unknown'
        bestTimeComplexity = data[algorithmType][algorithmID].bestTimeComplexity || 'Unknown'
        memoryComplexity = data[algorithmType][algorithmID].memoryComplexity || 'Unknown'
        stable = data[algorithmType][algorithmID].stable || 'Unknown'
        descriptionArray = data[algorithmType][algorithmID].description.split('\n')
        creditText = data[algorithmType][algorithmID].creditText || 'Description From'
        credit = data[algorithmType][algorithmID].credit
    }
    

    let card = (<div className='card' onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}>
                    <p className='title'>{title}</p>
                    <hr></hr>
                    <p className='meta'>{`Worst Case Time Complexity: ${worstTimeComplexity}`}</p>
                    <p className='meta'>{`Average Time Complexity: ${avgTimeComplexity}`}</p>
                    <p className='meta'>{`Best Case Time Complexity: ${bestTimeComplexity}`}</p>
                    <p className='meta'>{`Memory Complexity: ${memoryComplexity}`}</p>
                    <p className='meta'>Stable: {stable} <i className={'material-icons help'} title='Whether the position of equal values stay the same relative to each other'>help</i></p>
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