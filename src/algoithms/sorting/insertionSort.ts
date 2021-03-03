



function sort(array: number[]): [number[],object[],number]{
    let startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []

    for (let i = 0; i < sortedArray.length; i++){
        for (let j = i; j > 0; j--){
            animations.push({command: 'setColor',id: [j,j-1],color: '$BEING_CHECKED'})
            if (sortedArray[j] < sortedArray[j-1]) {
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j-1]
                sortedArray[j-1] = tmp
                animations.push({command: 'swap',id1: j, id2: j-1})
            } else {
                animations.push({command: 'setColor',id: [j,j-1],color: '$BASE'})
                break;
            }
            animations.push({command: 'setColor',id: [j,j-1],color: '$BASE'})
        }
    }

    let posIdxs = []
    for (let i = 0; i < sortedArray.length; i++){
        posIdxs.push(i)
        //animations.push({command: 'setColor',id: [i],color: '$DONE'})
    }
    animations.push({command: 'setColor',id: posIdxs,color: '$DONE'})
    
    const endTime = performance.now()
    const runTime = endTime - startTime
    console.log(sortedArray)
    return [sortedArray, animations, runTime]
}

function insertionSort(array: number[]): [object[],number]{
    let [sortedArray, animations, runTime] = sort(array)
    console.log(sortedArray)
    return [animations,runTime]
}


export default insertionSort