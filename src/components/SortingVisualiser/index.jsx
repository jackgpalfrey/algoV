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
    CHECKING: '#fc0388',
    DONE: '#0f8707',
    TEXT: 'white'
    
}

function SortingVisualiser(props){
    const cookieData = document.cookie.replace(';','').replace(' ','').split(',')
    const [array, setArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(cookieData[0] || 100)
    const [numBars, setNumBars] = useState(Math.round((window.innerWidth / 12) / 2))
    const [runTime, setRunTime] = useState(0)
    const [swaps, setSwaps] = useState(0)
    const [comparisons, setComparisons] = useState(0)
    const [animationActive, setAnimationActive] = useState(false)
    const [activeAlgorithm, setActiveAlgorithm] = useState(cookieData[1] || 'bubble')
    const [isTerminalOpen, setIsTerminalOpen] = useState(false)

    
    useEffect(effect => {
        document.cookie = `${animationSpeed},${activeAlgorithm};`;
    },[animationSpeed, activeAlgorithm])
    

    useEffect(effect => {
        AnimateEngine(["resetArray",numBars])
    }, [])


    function AnimateEngine(command){
        let commandCode = command[0]
        switch(commandCode){
            case 'setColor': // Sets color of bars. Syntax: ["setColor",[array of ids or $ALL, $LHALF, $RHALF], "valid css color OR valid inbuilt variable prefixed with $"]
                setArray(prevState => {
                    let newArray = prevState.slice()
                    let idxes = command[1]
                    let color = command[2]
                    if (color.includes('$')) color = COLORS[color.replace('$','')]
    
                    idxes.forEach(idx => {
                        if (idx === '$ALL'){
                            for (let y = 0; y < newArray.length; y++){
                                newArray[y].color = color
                            }
                        } else if (idx === '$LHALF'){
                            for (let y = 0; y < Math.ceil(newArray.length / 2); y++){
                                newArray[y].color = color
                            }
                        } else if (idx === '$RHALF'){
                            for (let y = Math.floor(newArray.length / 2); y < newArray.length; y++){
                                newArray[y].color = color
                            }
                        } else if (typeof idx == "number" && idx >= 0 && idx < newArray.length){
                            newArray[idx].color = color
                        }
                        
                    });
    
    
                    return newArray
                })
                break;
            
            case 'swap':
                setArray(prevState => {
                    let id1 = command[1]
                    let id2 = command[2]
    
                    let newArray = prevState.slice()
                    if (id1 >= 0 && id1 < newArray.length && id2 >= 0 && id2 < newArray.length){
                        const tmp1 = {...newArray[id1]}
                        const tmp2 = {...newArray[id2]}
                        newArray[id1] = tmp2
                        newArray[id2] = tmp1
                    }
                    
    
                    return newArray
                })
    
                break;
            
            case 'setValue':
                setArray(prevState => {
                    let newArray = prevState.slice()
                    let idxes = command[1]
                    let value = command[2]
    
                    idxes.forEach(idx => {
                        if (typeof idx == "number" && idx >= 0 && idx < newArray.length){
                            newArray[idx].value = value
                        }
                        
                    });
    
    
                    return newArray
                })
                break;
            
            case 'setArray':
                setArray(prevState => {
                    let newArray = []
                    let values = command[1]
                    let color = command[2]
                    if (color.includes('$')) color = COLORS[color.replace('$','')]
    
                    values.forEach(value => {
                       if (typeof value == "number"){
                            newArray.push({value: value, color: color})
                        }
                        
                    });
                    setNumBars(newArray.length)
                    return newArray
                })
                break;
            
            case 'resetArray':
                
                let numOfBars = command[1]
                //if (typeof numOfBars != "number") return
                let values = []
                for (let i = 0; i < numOfBars; i++){
                    values.push(Math.round(Math.random() * 60) + 8)
                }
                AnimateEngine(["setArray",values,"$BASE"])
                break;
            
            case 'setRunTimeDisplay':
                setRunTime(command[1])
                break;

            case 'setComparisonsDisplay':
                setComparisons(command[1])
                break;

            case 'setSwapsDisplay':
                setSwaps(command[1])
                break;

            case 'startAnimation':
                setAnimationActive(true)
                break;

            case 'endAnimation':
                setAnimationActive(false)
                break;

            case 'do':
                let subCommands = command[1]
                let interval = command[2]
                let currentCommandIdx = 0

                if (interval == '$userSet') interval = animationSpeed

                let intervalID = setInterval(() => {
                    if (currentCommandIdx >= subCommands.length){
                        clearInterval(intervalID)
                        return
                    }

                    AnimateEngine(subCommands[currentCommandIdx])
                    currentCommandIdx++
                }, interval)
                break;
            
            case 'doSim':
                let toRunCommands = command[1]
                for (let i = 0; i < toRunCommands.length; i++){
                    AnimateEngine(toRunCommands[i])
                }


                break;

            case 'doIn':
                console.log('doIn')
                setTimeout(() => {
                    command[1].forEach((value) => {
                        console.log(value)
                        AnimateEngine(value)
                    })
                }, command[2] )
                break;
        }
    
    }

    function resetArray(numOfBars){ // LEGACY - DEPRECATED IN 0.10
        AnimateEngine(["resetArray", numOfBars])
    }
    
    async function animate(command){ // LEGACY - DEPRECATED IN 0.10
        switch(command.command) {
            case 'setColor':
                AnimateEngine(["setColor",command.id,command.color])
                break;
            case 'swap':
                AnimateEngine(["swap",command.id1,command.id2])
                break;
            case 'setArray':
                AnimateEngine(["setArray",command.array,'$BASE'])
                break;
                
        }
    }

    function animator(animations,speed){ // LEGACY - DEPRECATED IN 0.10
        AnimateEngine(["startAnimation"])
        let idx = 0

        const intervalID = setInterval( () => {
            if (idx > animations.length - 1) {
                clearInterval(intervalID)
                AnimateEngine(["endAnimation"])
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
        let isLegacy = false
        if(animationActive) return false
        switch(activeAlgorithm){
            case 'bubble':
                data = bubbleSort(getNumbersFromArrayState())
                break;
            case 'selection':
                data = selectionSort(getNumbersFromArrayState())
                isLegacy = true
                break;
            case 'insertion':
                data = insertionSort(getNumbersFromArrayState())
                isLegacy = true
                break;
            case 'quick':
                return alert('Currently Unavailable')
                data = quickSort(getNumbersFromArrayState())
                isLegacy = true
                break;
            case 'heap':
                data = heapSort(getNumbersFromArrayState())
                isLegacy = true
                break;
            case 'merge':
                return alert('Currently Unavailable')
                data = mergeSort(getNumbersFromArrayState())
                isLegacy = true
                break;
            case 'reverseArray':
                data = reverseArray(getNumbersFromArrayState())
                isLegacy = true
                break;
        }


        // Legacy
        if (isLegacy){
            let [animations,runTime] = data
            AnimateEngine(["setRunTimeDisplay", Math.round(runTime * 1000) / 1000])
            animator(animations,animationSpeed)
        } else {
            // NEW Animation System
            AnimateEngine(["doSim", [data]])
        }
        
    }

    function handleConsole(e){
        if (e.key != 'Enter') return
        let command = e.target.value.replaceAll("'",'"')
        console.log(`Command: ${command}`)
        try {
            let jsonCommand = JSON.parse(command)
            AnimateEngine(jsonCommand)
        } catch {
            e.target.style = {color: 'red'}
            console.log("Invalid")
        }
    }

    function createBars(){
        let barWidth = ((window.innerWidth / 100) * 90) / numBars

        let barsDivs = array.map((item, idx) => {
            let style = {
                height: `${item.value}%`, 
                backgroundColor: `${item.color}`,
                width: barWidth,
                fontSize: barWidth > 20 ? barWidth / 3 : 0,
                color: COLORS.TEXT  
            }

            return (<div key={idx} className='bar' style={style}>{item.value}</div>)
        })

        return barsDivs
    }

    return (
        <div className='container'>
            <div className='bar-container'>
                <div className='inner-bar-container'>
                    {createBars()}
                </div>
                
            </div>
            <nav>
            <i className='material-icons consoleButton' onClick={() => setIsTerminalOpen(!isTerminalOpen)}>code</i>
            <div className='sliderBox'>
                <p className={animationActive ? 'disabled' : ''}>Animation Time ({animationSpeed}ms) </p>
                <input disabled={animationActive} type="range" min="1" max="1000" value={animationSpeed} onChange={e => {
                    setAnimationSpeed(e.target.value); 
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
                            AnimateEngine(["resetArray",e.target.value])
                        }}></input>
                    </div>
                    
                    

                <p className={animationActive ? 'timeTaken disabled' : 'timeTaken'}>{runTime !== 0 ? `Time: ${runTime}ms`: `Time: N/A`}</p>
                
            </nav>
            <InfoCard algorithmType='sorting' algorithmID={activeAlgorithm}/>

            {isTerminalOpen ? <input placeholder='Console' className='console' onKeyDown={handleConsole}></input> : null}
 
        </div>
        
    )
}


export default SortingVisualiser