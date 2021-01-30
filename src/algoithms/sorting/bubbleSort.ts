



function sort(array: number[]): [number[],object[],number]{
    const startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []

    for (let i = 0; i < sortedArray.length - 1; i++){
        
        for (let j = 0; j < sortedArray.length - 1 - i; j++){
            //animations.push({command: 'setColor',id: [j,j+1],color: '$BEING_CHECKED'})
            animations.push(["setColor", [j,j+1], "$CHECKING"])
            if (sortedArray[j] > sortedArray[j+1]){
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j+1]
                sortedArray[j+1] = tmp 
                //animations.push({command: 'swap',id1: j, id2: j+1})
                animations.push(["swap",j,j+1])
            }
            //animations.push({command: 'setColor',id: [j,j+1],color: '$BASE'})
            animations.push(["setColor",[j,j+1],"$BASE"])
        }
        //animations.push({command: 'setColor',id: [sortedArray.length - 1 - i],color: '$DONE'})
        animations.push(["setColor",[sortedArray.length - 1 - i],"$DONE"])
    }

    animations.push({command: 'setColor',id: [0],color: '$DONE'})


    const endTime = performance.now()
    const runTime = endTime - startTime

    animations.push(["setRunTimeDisplay", runTime])
    return [sortedArray, animations, runTime]

}

function bubbleSort(array: number[]): any{
    let [sortedArray, animations, runTime] = sort(array)

    let command = ["do", animations, 10]
    return (command)
}


export default bubbleSort