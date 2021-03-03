const COLORS = {
    CURRENT_MIN: '#3e09ba',
}


function sort(array: number[]) {
    const startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []
    let swaps = 0
    let comparisons = 0


    for (let i = 0; i < sortedArray.length - 1; i++){
        let minValIdx = i
        for (let j = i + 1; j < sortedArray.length; j++){
            animations.push(["setColor", [j], "$CHECKING"])
            comparisons++
            if (array[j] < array[minValIdx]){
                animations.push(["setColor", [minValIdx], "$BASE"])
                minValIdx = j
                animations.push(["setColor", [j], COLORS.CURRENT_MIN])
            } else {
                animations.push(["setColor", [j,j+1], "$BASE"])
            }  

                      
        }
        swaps++
        let tmp = array[i]
        array[i] = array[minValIdx]
        array[minValIdx] = tmp
        animations.push(["swap", i, minValIdx])
        animations.push(["setColor", [i], "$DONE"])
    }

    animations.push(["setColor", [-1], "$DONE"])
    const endTime = performance.now()
    const runTime = endTime - startTime

    animations.push(["endAnimation"])

    let endAni = []
    endAni.push(["setRunTimeDisplay", Math.round(runTime * 1000) / 1000])
    endAni.push(["setComparisonsDisplay", comparisons])
    endAni.push(["setSwapsDisplay", swaps])
    endAni.push(["startAnimation"])


    animations.unshift(["doSim", endAni])
    return [sortedArray, animations, runTime]
}

function selectionSort(array: number[]){
    let [sortedArray, animations, runTime] = sort(array)

    let command = ["do", animations, "$userSet"]
    return command
}


export default selectionSort;