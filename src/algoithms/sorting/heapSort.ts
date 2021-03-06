// FROM: https://levelup.gitconnected.com/heapsort-for-javascript-newbies-598d25477d55
//TODO: Improve Animations


function swap(array: number[], idx1: number, idx2: number, animations: object[]){
    let tmp = array[idx1]
    array[idx1] = array[idx2]
    array[idx2] = tmp
    animations.push(["swap", idx1, idx2])
}


function heapify(array: number[], length: number, idx: number, animations: object[], data: any){
    let largest:number = idx
    let left:number = idx * 2 + 1
    let right:number = left + 1

    animations.push(["setColor", [left,right], "$CHECKING"])
    data.comparisons++
    if(left < length && array[left] > array[largest]) {
        largest = left
    }
    data.comparisons++
    if(right < length && array[right] > array[largest]){
        largest = right
    }

    animations.push(["setColor", [left,right], "$BASE"])

    if(largest !== idx){
        data.swaps++
        swap(array, idx, largest, animations)
        heapify(array, length, largest, animations, data)
    }

}



function sort(array: number[], animations: object[], data: any){
    let length = array.length
    let idx = Math.floor(length / 2 - 1)
    let k = length - 1;

    while (idx >= 0) {
        heapify(array, length, idx, animations, data)
        idx--
    }

    while(k >= 0){
        data.swaps++
        swap(array, 0, k, animations)
        heapify(array, k, 0, animations, data)
        //animations.push({command: 'setColor',id: [k],color: '$DONE'})
        k--
    }

    return array
}



function heapSort(array: number[]){
    let startTime = performance.now()
    var animations: object[] = [];
    var data = {
        swaps: 0,
        comparisons: 0
    }
    let sortedArray = sort(array, animations,data)

    let endTime = performance.now()

    animations.push(["setColor", ["$ALL"], "$DONE"])

    let runTime = endTime - startTime


    animations.push(["endAnimation"])

    let endAni = []
    endAni.push(["setRuntimeDisplay", Math.round(runTime * 1000) / 1000])
    endAni.push(["setComparisonsDisplay", data.comparisons])
    endAni.push(["setSwapsDisplay", data.swaps])
    endAni.push(["startAnimation"])


    animations.unshift(["doSim", endAni])
    let command = ["do", animations, "$userSet"]
    return command
}

export default heapSort