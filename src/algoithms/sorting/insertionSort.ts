const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    DONE: '#15ba09'
}



function sort(array: number[]): [number[],object[],number]{
    let startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []

    for (let i = 1; i < sortedArray.length; i++){
        for (let j = i; j > 0; j--){
            animations.push({command: 'setColor',id: [j,j-1],color: COLORS.BEING_CHECKED})
            if (sortedArray[j] < sortedArray[j-1]) {
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j-1]
                sortedArray[j-1] = tmp
                animations.push({command: 'swap',id1: j, id2: j-1})
            } else {
                animations.push({command: 'setColor',id: [j,j-1],color: COLORS.BASE})
                break;
            }
            animations.push({command: 'setColor',id: [j,j-1],color: COLORS.BASE})
        }
    }

    for (let i = 0; i < sortedArray.length; i++){
        animations.push({command: 'setColor',id: [i],color: COLORS.DONE})
    }
    
    const endTime = performance.now()
    const runTime = endTime - startTime
    return [sortedArray, animations, runTime]
}

function insertionSort(array: number[]): [object[],number]{
    let [sortedArray, animations, runTime] = sort(array)
    console.log(sortedArray)
    return [animations,runTime]
}


export default insertionSort