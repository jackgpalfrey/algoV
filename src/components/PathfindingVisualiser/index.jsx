import React from 'react'
import './style.css'
import Console from '../Console'


function PathfindingVisualiser(){
    function AnimateEngine(){
        return 
    }

    return (
        <div className='grid-container'>
            <Console display={true} docsKey='AnimateEngineSort-clearLoop' AnimateEngine={AnimateEngine}/>
        </div>
    )
}

export default PathfindingVisualiser