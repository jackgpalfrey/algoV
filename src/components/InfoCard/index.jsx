import React, { useState } from 'react'
import './style.css'
//import data from '../../data/algorithmInfo.json'

import getLocaleText from '../../util/getLocaleText'
const text = getLocaleText('general').infoCard
const data = getLocaleText('algorithmInfo')


function InfoCard({algorithmType, algorithmID}){
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenHover, setIsOpenHover] = useState(false)
    

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
    

    let card = (<div className='card scrollable-bright' /*onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}*/>
                    <p className='title'>{title}</p>
                    <hr></hr>
                    <p className='meta'>{`${text.worstCaseTimeMeta} ${worstTimeComplexity}`}</p>
                    <p className='meta'>{`${text.avgTimeMeta} ${avgTimeComplexity}`}</p>
                    <p className='meta'>{`${text.bestCaseTimeMeta} ${bestTimeComplexity}`}</p>
                    <p className='meta'>{`${text.memoryMeta} ${memoryComplexity}`}</p>
                    <p className='meta'>{`${text.stableMeta} ${stable} `}<i className={'material-icons help'} title={text.stableMetaDesc}>help</i></p>
                    <hr></hr>
                    {descriptionArray.map((item,idx) => <p className='description'>{item}</p>)}
                    {credit ? <a className='credit' href={credit} >{`${creditText}: ${credit}`}</a> : null}     
                </div>)
    return (
            <div className='card-container' /*onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}*/ >
                {isOpen || isOpenHover ? card : null}
                <button onClick={() => setIsOpen(!isOpen)} className='openCardButton' >
                {isOpen ? <i className="material-icons clickable dark">close</i> : <i className="material-icons clickable dark">info</i> }
                </button>  
            </div>
            )

    }

export default InfoCard