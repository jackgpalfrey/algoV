import React, { useEffect, useState } from 'react'
import bubbleSort from '../../algoithms/sorting/bubbleSort'
import insertionSort from '../../algoithms/sorting/insertionSort'
import selectionSort from '../../algoithms/sorting/selectionSort'
import InfoCard from '../InfoCard'
import './style.css'

function SortingVisualiser(props){
    const [array, setArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(100)
    const [numBars, setNumBars] = useState(60)
    const [runTime, setRunTime] = useState(0)
    const [animationActive, setAnimationActive] = useState(false)
    const [isInfoCardOpen, setIsInfoCardOpen] = useState(false)
    const [activeAlgorithm, setActiveAlgorithm] = useState('bubble')

    useEffect(effect => {
        resetArray()
    }, [])

    function resetArray(){
        let newArray = []
        for (let i = 1; i < numBars; i++){
            let randomVal = Math.round(Math.random() * 60) + 5
            //let randomVal = i + 10
            let item = {
                value: randomVal,
                color: '#035efc'
            }
            newArray.push(item)
        }
        setArray(newArray)
    }

    async function animate(command){



        setArray(prevState => {
            try {
                let newArray = prevState.slice()
                switch(command.command){
                    case 'setColor':
                        if (typeof command.id === 'number' && command.id > newArray.length -1 ) return newArray[command.id].color = command.color
                        command.id.forEach(value => {
                            newArray[value].color = command.color
                        })
                        
                        break;
                    case 'swap':
                        if (command.id1 > newArray.length -1) throw 'Out of bounds'
                        if (command.id2 > newArray.length -1) throw 'Out of bounds'
                        const tmp1 = {...newArray[command.id1]}
                        const tmp2 = {...newArray[command.id2]}
                        newArray[command.id1] = tmp2
                        newArray[command.id2] = tmp1
                        break;
                }
                
                return newArray
            
            } catch {
                return prevState
            }  
        });
        

    }




    function animator(animations,speed){
        setAnimationActive(prevState => true)
        let idx = 0

        const intervalID = setInterval( () => {
            console.log(animationActive)
            if (idx > animations.length - 1) {
                clearInterval(intervalID)
                setAnimationActive(false)
                return 
            }
            animate(animations[idx])
            idx++
        }, speed)
    }

    function getNumbersFromArrayState(){
        let numbers = []
        for (let i = 0; i < array.length; i++){
            numbers.push(array[i].value)
        }

        return numbers
    }

    function handleSortClick(){
        let data = []
        switch(activeAlgorithm){
            case 'bubble':
                data = bubbleSort(getNumbersFromArrayState())
                break;
            case 'selection':
                data = selectionSort(getNumbersFromArrayState())
                break;
            case 'insertion':
                data = insertionSort(getNumbersFromArrayState())
                break;
        }

        let [animations,runTime] = data
        setRunTime(Math.round(runTime * 1000) / 1000)
        animator(animations,animationSpeed)
    }

    //console.log(array)
    let barWidth = ((window.innerWidth / 100) * 90) / numBars

    
    console.log(barWidth)
    let barsDivs = array.map((item,idx)  => {
        let barStyle = {
            height: `${item.value * 10}px`, 
            backgroundColor: `${item.color}`,
            width: barWidth,
            fontSize: barWidth > 20 ? barWidth / 3 : 0,
            
        }
        return (<div key={idx} className='bar' style={barStyle}>{item.value}</div>)
    })

    

    return (
        <div className='container'>
            <div className='bar-container'>
                <div className='inner-bar-container'>
                    {barsDivs}
                </div>
                
            </div>
            <nav>
            <button disabled={animationActive} onClick={resetArray}>Reset</button>
                <select disabled={animationActive} value={activeAlgorithm} onChange={e => {setActiveAlgorithm(e.target.value)}}>
                    <option value='bubble'>Bubble Sort</option>
                    <option value='selection'>Selection Sort</option>
                    <option value='insertion'>Insertion Sort</option>
                </select>
                <button disabled={animationActive} onClick={handleSortClick}>Sort</button>
                <p>Animation Time ({animationSpeed}ms) </p>
                    <input disabled={animationActive} type="range" min="1" max="1000" value={animationSpeed} onChange={e => {
                        setAnimationSpeed(e.target.value)
                    }}></input>
                    <p>Number of Bars</p>
                    <input disabled={animationActive} type="range" min="5" max="100" value={numBars} onChange={e => {
                        setNumBars(e.target.value)
                        resetArray()
                    }}></input>

                <p>{runTime !== 0 ? `Time Taken: ${runTime}ms`: `Nothing Has Been Sorted`}</p>
                
            </nav>
            {isInfoCardOpen ? <InfoCard algorithmType='sorting' algorithmID={activeAlgorithm}/> : null}
            <div onClick={() => setIsInfoCardOpen(!isInfoCardOpen)} className='openCardButton' >
                {isInfoCardOpen ? <i className="material-icons ">close</i> : <i className="material-icons ">info</i> }
            </div>
            
        </div>
        
    )
}


export default SortingVisualiser