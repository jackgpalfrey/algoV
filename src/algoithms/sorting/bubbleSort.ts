const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    DONE: '#15ba09'
}



function sort(array: number[]): [number[],object[]]{
    let sortedArray: number[] = array
    let animations: object[] = []

    for (let i = 0; i < sortedArray.length - 1; i++){
        
        for (let j = 0; j < sortedArray.length - 1 - i; j++){
            animations.push({command: 'setColor',id: [j,j+1],color: COLORS.BEING_CHECKED})
            if (sortedArray[j] > sortedArray[j+1]){
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j+1]
                sortedArray[j+1] = tmp 
                animations.push({command: 'swap',id1: j, id2: j+1})
            }
            animations.push({command: 'setColor',id: [j,j+1],color: COLORS.BASE})
        }
        animations.push({command: 'setColor',id: [sortedArray.length - 1 - i],color: COLORS.DONE})
    }

    animations.push({command: 'setColor',id: [0],color: COLORS.DONE})


    return [sortedArray, animations]
}

function bubbleSort(array: number[]): object[]{
    let [sortedArray, animations] = sort(array)
    console.log(sortedArray)
    return animations
}


export default bubbleSort