import React from 'react'
import './style.css'
import data from '../../data/algorithmInfo.json'


function InfoCard({algorithmType, algorithmID}){
    let descriptionArray = data[algorithmType][algorithmID].description.split('\n')
    return (
            <div className='card'>
                <p className='title'>{data[algorithmType][algorithmID].title}</p>
                <hr></hr>
                <p>{`Average Time Complexity: ${data[algorithmType][algorithmID].avgTimeComplexity}`}</p>
                <hr></hr>
                {descriptionArray.map((item,idx) => <p>{item}</p>)}  
                <a className='credit' href='https://en.wikipedia.org/wiki/Sorting_algorithm'>Description From: https://en.wikipedia.org/wiki/Sorting_algorithm</a>       
            </div>
            )

    }

export default InfoCard