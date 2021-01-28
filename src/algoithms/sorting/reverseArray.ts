
function sort(array: any, animations: any): any {
    let sortedArray = array.slice()

    for (let i = 0; i < Math.floor(sortedArray.length / 2); i++){
        animations.push({command: 'setColor',id: [i,(sortedArray.length-1-i)],color: '$BEING_CHECKED'})
        let tmp = sortedArray[i]
        sortedArray[i] = sortedArray[sortedArray.length-1-i]
        sortedArray[sortedArray.length-1-i] = tmp
        animations.push({command: 'swap',id1: i, id2: (sortedArray.length-1-i)})
        animations.push({command: 'setColor',id: [i,(sortedArray.length-1-i)],color: '$DONE'})
    }

    animations.push({command: 'setColor',id: [(Math.ceil(sortedArray.length / 2)) - 1],color: '$DONE'})

    return [sortedArray, animations]


}

function reverseArray(array: number[]): [object[],number]{
    const startTime = performance.now()
    let animations: object[] = []
    let sortedArray: number[];


    [sortedArray, animations] = sort(array,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime

    //animations = [{command: 'setArray',array: sortedArray}]

    return [animations, runTime]
}


export default reverseArray