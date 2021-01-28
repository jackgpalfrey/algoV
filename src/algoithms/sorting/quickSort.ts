const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    DONE: '#15ba09'
}



function sort(array: any, animations: any): any {
    if (array.length === 1){
        return array
    }

    const pivot = array[array.length - 1]
    let leftArray = []
    let rightArray = []
    for (let i = 0; i < array.length - 1; i++){
        if (array[i] < pivot){
            leftArray.push(array[i])
            animations.push({command: 'setColor',id: [i],color: COLORS.BEING_CHECKED})
        } else {
            animations.push({command: 'setColor',id: [i],color: COLORS.DONE})
            rightArray.push(array[i])
        }
    }


    if (leftArray.length > 0 && rightArray.length > 0){
        return [...sort(leftArray,animations), pivot, ...sort(rightArray,animations)]
    } else if (leftArray.length > 0){
        return [...sort(leftArray,animations), pivot]
    } else {
        return [pivot, ...sort(rightArray,animations)]
    }


}

function quickSort(array: number[]): [object[],number]{
    const startTime = performance.now()
    let animations: object[] = []


    let sortedArray = sort(array,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime

    //animations = [{command: 'setArray',array: sortedArray}]

    return [animations, runTime]
}


export default quickSort