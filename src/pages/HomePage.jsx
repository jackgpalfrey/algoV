import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../components/ChangeLog/Container'
import Item from '../components/ChangeLog/Item'

import changeLogItems from '../data/changelogData.json'


let items = changeLogItems.map((value, idx) => {
    return <Item key={idx} version={value.version} title={value.title}> <p>{value.info}</p> </Item>
})
function HomePage(){
    return (
        <div className='changeLog'>
            <Container titleBgColor='' titleTxtColor='' infoBgColor='' infoTxtColor=''>
                {items}
            </Container>
        </div>

    )
}

export default HomePage