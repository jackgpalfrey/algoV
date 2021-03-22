function mergeArrays(leftArray: any, rightArray: any, animations: any){
    let leftIndex = 0 , rightIndex = 0

    while(leftIndex < leftArray.length && rightIndex < rightArray.length){
        animations.push({command: 'swap',id1: rightArray[rightIndex][0], id2: rightArray[rightIndex][0]})
        let tmp = leftArray[leftIndex]
        leftArray[leftIndex] = rightArray[rightIndex]
        rightArray[rightIndex] = tmp
        if (leftArray[leftIndex][1] < rightArray[rightIndex][1]){
            leftIndex++
        } else {
            rightIndex++
        }
    }



    return 
}



function sort(array: any, animations: any): any {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2);

    const left = array.slice(0,middle);
    const right = array.slice(middle);

    return mergeArrays(sort(left,animations), sort(right,animations),animations)

}


function createIndexedArray(array: number[]){
    let indexedArray = []
    for (let i = 0; i < array.length - 1; i++){
        indexedArray.push([i,array[i]])
    }

    return indexedArray
}

function mergeSort(array: number[]): [object[],number]{
    const startTime = performance.now()
    let animations: object[] = []
    let sortedArray: number[];

    let indexedArray: number[][] = createIndexedArray(array)


    sortedArray = sort(indexedArray,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime


    return [animations, runTime]
}


export default mergeSort