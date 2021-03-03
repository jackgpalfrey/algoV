// FROM: https://levelup.gitconnected.com/heapsort-for-javascript-newbies-598d25477d55
//TODO: Improve Animations


function swap(array: number[], idx1: number, idx2: number, animations: object[]){
    let tmp = array[idx1]
    array[idx1] = array[idx2]
    array[idx2] = tmp
    animations.push({command: 'swap',id1: idx1, id2: idx2})
}


function heapify(array: number[], length: number, idx: number, animations: object[]){
    let largest:number = idx
    let left:number = idx * 2 + 1
    let right:number = left + 1

    animations.push({command: 'setColor',id: [left,right],color: '$BEING_CHECKED'})

    if(left < length && array[left] > array[largest]) {
        largest = left
    }

    if(right < length && array[right] > array[largest]){
        largest = right
    }

    animations.push({command: 'setColor',id: [left,right],color: '$BASE'})

    if(largest != idx){
        swap(array, idx, largest, animations)
        heapify(array, length, largest, animations)
    }
}



function sort(array: number[], animations: object[]){
    let length = array.length
    let idx = Math.floor(length / 2 - 1)
    let k = length - 1;

    while (idx >= 0) {
        heapify(array, length, idx, animations)
        idx--
    }

    while(k >= 0){
        swap(array, 0, k, animations)
        heapify(array, k, 0, animations)
        //animations.push({command: 'setColor',id: [k],color: '$DONE'})
        k--
    }

    return array
}



function heapSort(array: number[]){
    let startTime = performance.now()
    var animations: object[] = [];
    let sortedArray = sort(array, animations)

    let endTime = performance.now()

    let idxs:number[] = []
    for (let i = 0; i < array.length; i++){
        idxs.push(i)
    }
    animations.push({command: 'setColor',id: idxs, color: '$DONE'})


    let runTime = endTime - startTime
    return [animations, runTime]
}

export default heapSort