
function sort(array: any, animations: any): any {
    let sortedArray = array.slice()
    let swaps = 0

    for (let i = 0; i < Math.floor(sortedArray.length / 2); i++){
        animations.push(["setColor", [i,(sortedArray.length-1-i)], "$CHECKING"])
        let tmp = sortedArray[i]
        sortedArray[i] = sortedArray[sortedArray.length-1-i]
        sortedArray[sortedArray.length-1-i] = tmp
        swaps++
        animations.push(["swap", i, (sortedArray.length-1-i)])
        animations.push(["setColor", [i,(sortedArray.length-1-i)], "$DONE"])
    }

    animations.push(["setColor", [(Math.ceil(sortedArray.length / 2)) - 1], "$DONE"])

    return [sortedArray, animations, swaps]


}

function reverseArray(array: number[]){
    const startTime = performance.now()
    let animations: object[] = []
    let sortedArray: number[];
    let swaps:number


    [sortedArray, animations, swaps] = sort(array,animations)


    const endTime = performance.now()
    const runTime = endTime - startTime

    animations.push(["endAnimation"])

    let endAni = []
    endAni.push(["setRuntimeDisplay", Math.round(runTime * 1000) / 1000])
    endAni.push(["setComparisonsDisplay", 0])
    endAni.push(["setSwapsDisplay", swaps])
    endAni.push(["startAnimation"])


    animations.unshift(["doSim", endAni])
    let command = ["do", animations, "$userSet"]
    return command
}


export default reverseArray