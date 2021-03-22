function sort(array: any, animations: any): any {
 


}

function quickSort(array: number[]): [object[],number]{
    const startTime = performance.now()
    let animations: object[] = []


    let sortedArray = sort(array,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime


    return [animations, runTime]
}


export default quickSort