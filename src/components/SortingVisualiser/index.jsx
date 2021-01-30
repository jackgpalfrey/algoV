import React, { useEffect, useState } from 'react'
import bubbleSort from '../../algoithms/sorting/bubbleSort'
import heapSort from '../../algoithms/sorting/heapSort'
import insertionSort from '../../algoithms/sorting/insertionSort'
import mergeSort from '../../algoithms/sorting/mergeSort'
import quickSort from '../../algoithms/sorting/quickSort'
import reverseArray from '../../algoithms/sorting/reverseArray'
import selectionSort from '../../algoithms/sorting/selectionSort'
import InfoCard from '../InfoCard'
import './style.css'


const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    DONE: '#0f8707',
    TEXT: 'white'
    
}

function SortingVisualiser(props){
    const cookieData = document.cookie.replace(';','').replace(' ','').split(',')
    const [array, setArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(cookieData[0] || 100)
    const [numBars, setNumBars] = useState(Math.round((window.innerWidth / 12) / 2))
    const [runTime, setRunTime] = useState(0)
    const [animationActive, setAnimationActive] = useState(false)
    const [activeAlgorithm, setActiveAlgorithm] = useState(cookieData[1] || 'bubble')
    const [isSorted, setIsSorted] = useState(true)

    
    useEffect(effect => {
        document.cookie = `${animationSpeed},${activeAlgorithm};`;
    },[animationSpeed, activeAlgorithm])
    

    useEffect(effect => {
        resetArray(numBars)

    }, [])

    function resetArray(numOfBars){
        let newArray = []
        for (let i = 0; i < numOfBars; i++){
            let randomVal = Math.round(Math.random() * 60) + 8
            let item = {
                value: randomVal,
                color: COLORS.BASE
            }
            newArray.push(item)
        }
        setIsSorted(false)
        setArray(newArray)
    }

    async function animate(command){
        setArray(prevState => {
            try {
                let newArray = prevState.slice()
                switch(command.command){
                    case 'setColor':
                        if (typeof command.id === 'number' && command.id > newArray.length -1 ) return newArray[command.id].color = command.color
                        let col;
                        command.id.forEach(value => {
                            if (value > newArray.length - 1) return; //throw 'Out of bounds'
                            if (command.color[0] === '?') {
                                command.color = command.color.slice(1)
                                if (array[value].color == COLORS.DONE) return
                            }
                            command.color[0] === '$' ? col = COLORS[command.color.slice(1)] : col = command.color 
                            newArray[value].color = col
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
                    case 'setArray':
                        newArray = []
                        command.array.forEach(val => {
                            let item = {
                                value: val,
                                color: COLORS.BASE
                            }
                            newArray.push(item)
                        })
                        break;
                }
                
                return newArray
            
            } catch (err) {
                throw err
                return prevState
            }  
        });
        

    }




    function animator(animations,speed){
        setAnimationActive(prevState => true)
        let idx = 0

        const intervalID = setInterval( () => {
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
        if(animationActive) return false
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
            case 'quick':
                //return alert('Currently Unavailable')
                data = quickSort(getNumbersFromArrayState())
                break;
            case 'heap':
                data = heapSort(getNumbersFromArrayState())
                break;
            case 'merge':
                return alert('Currently Unavailable')
                data = mergeSort(getNumbersFromArrayState())
                break;
            case 'reverseArray':
                data = reverseArray(getNumbersFromArrayState())
                break;
        }

        let [animations,runTime] = data
        setRunTime(Math.round(runTime * 1000) / 1000)
        animator(animations,animationSpeed)
        setIsSorted(true)
    }

    let barWidth = ((window.innerWidth / 100) * 90) / numBars

    let barsDivs = array.map((item,idx)  => {
        let barStyle = {
            height: `${item.value}%`, 
            backgroundColor: `${item.color}`,
            width: barWidth,
            fontSize: barWidth > 20 ? barWidth / 3 : 0,
            color: COLORS.TEXT
            
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
            <div className='sliderBox'>
                <p className={animationActive ? 'disabled' : ''}>Animation Time ({animationSpeed}ms) </p>
                <input disabled={animationActive} type="range" min="1" max="1000" value={animationSpeed} onChange={e => {
                    setAnimationSpeed(e.target.value)
                }}></input>
            </div>
                <button disabled={animationActive} onClick={() => {if(!animationActive) {resetArray(numBars)}}} className={!animationActive ? 'button reset' : 'button-disabled reset'}>Reset</button>
                <button disabled={animationActive} onClick={handleSortClick} className={!animationActive ? 'button sort' : 'button-disabled sort'}>Sort</button>
                <select disabled={animationActive} value={activeAlgorithm} onChange={e => {setActiveAlgorithm(e.target.value)}}>
                    <option value='bubble'>Bubble Sort</option>
                    <option value='selection'>Selection Sort</option>
                    <option value='insertion'>Insertion Sort</option>
                    <option value='quick'>Quick Sort</option>
                    <option value='heap'>Heap Sort</option>
                    <option value='merge'>Merge Sort</option>
                    <option value='reverseArray'>(Other)Reverse Array</option>
                </select>
                
                    <div className='sliderBox'>
                        <p className={animationActive ? 'disabled' : ''}>Number of Bars ({numBars})</p>
                        <input disabled={animationActive} type="range" min="5" max={`${Math.round(window.innerWidth / 12) - 10}`} value={numBars} onChange={e => {
                            setNumBars(e.target.value)
                            resetArray(e.target.value)
                        }}></input>
                    </div>
                    
                    

                <p className={animationActive ? 'timeTaken disabled' : 'timeTaken'}>{runTime !== 0 ? `Time: ${runTime}ms`: `Time: N/A`}</p>
                
            </nav>
            <InfoCard algorithmType='sorting' algorithmID={activeAlgorithm}/>
 
        </div>
        
    )
}


export default SortingVisualiser