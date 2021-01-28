const COLORS = {
    BASE: '#035efc',
    BEING_CHECKED: '#fc0388',
    DONE: '#15ba09'
}



function sort(array: any, animations: any): any {


}

function mergeSort(array: number[]): [object[],number]{
    const startTime = performance.now()
    let animations: object[] = []
    let sortedArray: number[];


    [sortedArray, animations] = sort(array,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime

    //animations = [{command: 'setArray',array: sortedArray}]

    return [animations, runTime]
}


export default mergeSort