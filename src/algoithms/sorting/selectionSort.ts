const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    CURRENT_MIN: '#3e09ba',
    DONE: '#15ba09'
}


function sort(array: number[]): [number[],object[]]{
    let sortedArray: number[] = array
    let animations: object[] = []
    for (let i = 0; i < sortedArray.length - 1; i++){
        let minValIdx = i
        for (let j = i + 1; j < sortedArray.length; j++){
            animations.push({command: 'setColor',id: [j,j+1],color: COLORS.BEING_CHECKED})
            if (array[j] < array[minValIdx]){
                animations.push({command: 'setColor',id: [minValIdx],color: COLORS.BASE})
                minValIdx = j
                animations.push({command: 'setColor',id: [j],color: COLORS.CURRENT_MIN})    
            } else {
                animations.push({command: 'setColor',id: [j,j+1],color: COLORS.BASE})
            }            
        }

        let tmp = array[i]
        array[i] = array[minValIdx]
        array[minValIdx] = tmp
        animations.push({command: 'swap',id1: i, id2: minValIdx})
        animations.push({command: 'setColor',id: [i],color: COLORS.DONE})

    }

    animations.push({command: 'setColor',id: [sortedArray.length -1],color: COLORS.DONE})
    return [sortedArray, animations]
}

function selectionSort(array: number[]): object[]{
    let [sortedArray, animations] = sort(array)
    console.log(sortedArray)
    return animations
}


export default selectionSort;