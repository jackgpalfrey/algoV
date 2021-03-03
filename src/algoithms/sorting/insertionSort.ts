



function sort(array: number[]){
    let startTime = performance.now()
    let sortedArray: number[] = array
    let animations = []
    let swaps = 0
    let comparisons = 0

    for (let i = 0; i < sortedArray.length; i++){
        for (let j = i; j > 0; j--){
            animations.push(["setColor", [j,j-1], "$CHECKING"])
            comparisons++
            if (sortedArray[j] < sortedArray[j-1]) {
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j-1]
                sortedArray[j-1] = tmp
                swaps++
                animations.push(["swap", j, j-1])
            } else {
                animations.push(["setColor", [j,j-1], "$BASE"])
                break;
            }
            animations.push(["setColor", [j,j-1], "$BASE"])
        }
    }

    const endTime = performance.now()
    const runTime = endTime - startTime

    animations.push(["setColor", ["$ALL"], "$DONE"])
    animations.push(["endAnimation"])

    let endAni = []
    endAni.push(["setRunTimeDisplay", Math.round(runTime * 1000) / 1000])
    endAni.push(["setComparisonsDisplay", comparisons])
    endAni.push(["setSwapsDisplay", swaps])
    endAni.push(["startAnimation"])


    animations.unshift(["doSim", endAni])
    return [sortedArray, animations, runTime]
}

function insertionSort(array: number[]){
    let [sortedArray, animations, runTime] = sort(array)

    let command = ["do", animations, "$userSet"]
    return command
}


export default insertionSort