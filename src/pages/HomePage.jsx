import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../components/ChangeLog/Container'
import Item from '../components/ChangeLog/Item'
import './HomePageStyle.css'
import icon from '../images/icon.png'


//import changeLogData from '../data/changelogData.json'



import getLocaleText from '../util/getLocaleText'
const text = getLocaleText('general').changelog
const changeLogData = getLocaleText('changeLog')

function HomePage(){
    const [isAllOpen, setIsAllOpen] = useState(false)
    const [isNewestFirst, setIsNewestFirst] = useState(true)
    console.log(isAllOpen)

    let changeLogItems = changeLogData.slice()
    if (isNewestFirst) changeLogItems = changeLogItems.reverse()

    let changeItems = changeLogItems.map((value, idx) => {
        let dontDisplay = value.dontDisplay
        let displayAfter = value.displayAfter
        if (displayAfter) {
            const [day, month, year] = displayAfter.split('/')
            displayAfter = `${year}-${month}-${day}`
            
        }
        let date = new Date().getTime()
        let afterDate = Date.parse(displayAfter)
        let timeUntil = afterDate - date
        if ((!dontDisplay && !displayAfter) || (timeUntil <= 0)) return <Item key={idx}  isOpen={isAllOpen} changes={value.modifications} date={value.isNext ? `${text.plannedForDate} ${value.date}` : value.date} version={value.isNext ? text.nextUpdateVersionKey : value.version} title={value.title}> <p>{value.info}</p> </Item>
    })


    console.log(getLocaleText('general'))

    return (
        <div className='changeLog'>
            <div className='changeLogMenuItems'>
                <div className='openAllChangesButton clickable' onClick={() => setIsAllOpen(!isAllOpen)}>{isAllOpen ? text.closeAllButton : text.openAllButton}</div>
                <img className='homepage-img' src={icon} alt='AlgoV' width='100' height='50'/>
                <div className='openAllChangesButton clickable' onClick={() => setIsNewestFirst(!isNewestFirst)}>{isNewestFirst ? text.orderOldestToNewestButton : text.orderNewestToOldestButton}</div>
            </div>
            <Container titleBgColor='' titleTxtColor='' infoBgColor='' infoTxtColor=''>
                {changeItems}
            </Container>
        </div>

    )
}

export default HomePage