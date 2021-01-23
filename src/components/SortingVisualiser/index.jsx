import React, { useEffect, useState } from 'react'
import bubbleSort from '../../algoithms/sorting/bubbleSort'
import selectionSort from '../../algoithms/sorting/selectionSort'
import './style.css'

function SortingVisualiser(props){
    const [array, setArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(100)
    const [animationActive, setAnimationActive] = useState(false)

    useEffect(effect => {
        resetArray()
    }, [])

    function resetArray(){
        let newArray = []
        for (let i = 0; i < props.bars; i++){
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
    function handleBubbleClick(){
        let animations = bubbleSort(getNumbersFromArrayState())
        animator(animations,animationSpeed)
    }
    function handleSelectionClick(){
        let animations = selectionSort(getNumbersFromArrayState())
        animator(animations,animationSpeed)
    }

    //console.log(array)
    let barsDivs = array.map((item,idx)  => {
        return (<div key={idx} className='bar' style={{height: `${item.value * 10}px`, backgroundColor: `${item.color}`}}>{item.value}</div>)
    })

    

    return (
        <div className='container'>
            <div className='bar-container'>
                {barsDivs}
            </div>
            <nav>
            <button disabled={animationActive} onClick={resetArray}>Reset</button>
                <button disabled={animationActive} onClick={handleBubbleClick}>Bubble</button>
                <button disabled={animationActive} onClick={handleSelectionClick}>Selection</button>
                <label>
                    Animation Time (ms) 
                    <input disabled={animationActive} value={animationSpeed} onChange={(e) => {
                        let val = parseInt(e.target.value)
                        if (!val) {
                            setAnimationSpeed(0)
                        } else {
                            setAnimationSpeed(val)
                        }
                        
                    }}/>
                </label>
                
            </nav>
        </div>
        
    )
}


export default SortingVisualiser