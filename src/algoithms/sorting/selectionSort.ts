const COLORS = {
    CURRENT_MIN: '#3e09ba',
}


function sort(array: number[]): [number[],object[],number]{
    const startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []
    for (let i = 0; i < sortedArray.length - 1; i++){
        let minValIdx = i
        for (let j = i + 1; j < sortedArray.length; j++){
            animations.push({command: 'setColor',id: [j],color: '$BEING_CHECKED'})
            if (array[j] < array[minValIdx]){
                animations.push({command: 'setColor',id: [minValIdx],color: '$BASE'})
                minValIdx = j
                animations.push({command: 'setColor',id: [j],color: COLORS.CURRENT_MIN})    
            } else {
                animations.push({command: 'setColor',id: [j,j+1],color: '$BASE'})
            }  

                      
        }

        let tmp = array[i]
        array[i] = array[minValIdx]
        array[minValIdx] = tmp
        animations.push({command: 'swap',id1: i, id2: minValIdx})
        animations.push({command: 'setColor',id: [i],color: '$DONE'})

    }

    animations.push({command: 'setColor',id: [sortedArray.length -1],color: '$DONE'})
    const endTime = performance.now()
    const runTime = endTime - startTime
    return [sortedArray, animations, runTime]
}

function selectionSort(array: number[]): [object[],number]{
    let [sortedArray, animations, runTime] = sort(array)
    console.log(sortedArray)
    return [animations, runTime]
}


export default selectionSort;