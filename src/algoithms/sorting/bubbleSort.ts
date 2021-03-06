function sort(array: number[]): [number[],object[],number]{
    const startTime = performance.now()
    let sortedArray: number[] = array
    let animations: object[] = []
    let swaps = 0
    let comparisons = 0

    for (let i = 0; i < sortedArray.length - 1; i++){
        
        for (let j = 0; j < sortedArray.length - 1 - i; j++){
            animations.push(["setColor", [j,j+1], "$CHECKING"])
            comparisons++
            if (sortedArray[j] > sortedArray[j+1]){
                const tmp = sortedArray[j]
                sortedArray[j] = sortedArray[j+1]
                sortedArray[j+1] = tmp 
                animations.push(["swap",j,j+1])
                swaps++
            }
            animations.push(["setColor",[j,j+1],"$BASE"])
        }
        animations.push(["setColor",[sortedArray.length - 1 - i],"$DONE"])
    }

   
    const endTime = performance.now()
    const runTime = endTime - startTime

    animations.push(["setColor", [0], "$DONE"])
    animations.push(["endAnimation"])

    let endAni = []
    endAni.push(["setRuntimeDisplay", Math.round(runTime * 1000) / 1000])
    endAni.push(["setComparisonsDisplay", comparisons])
    endAni.push(["setSwapsDisplay", swaps])
    endAni.push(["startAnimation"])


    animations.unshift(["doSim", endAni])
    return [sortedArray, animations, runTime]

}

function bubbleSort(array: number[]): any{
    let [sortedArray, animations, runTime] = sort(array)

    let command = ["do", animations, "$userSet"]
    return (command)
}


export default bubbleSort