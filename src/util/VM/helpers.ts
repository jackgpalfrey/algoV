import INS from './instructionSet'


    /**
     * Converts integer to binary value
     */
 export function toBin(intValue: number, allowBiggerThan8Bit: boolean = false, bitLength:number = 8): string{
    if (intValue > 255 && !allowBiggerThan8Bit) throw new Error('8 Bit Overflow')
    let bin = Math.abs(intValue).toString(2)
    let result
    if (bin.length < bitLength) {
        result = Array(bitLength - bin.length + 1).join("0")
        result += bin
    } else {
        result = bin
    }
    
    return result
}

    /**
     * Converts integer to hex value
     */
  export function toHex(intValue: number, allowBiggerThan8Bit:boolean = false): string{
    if (intValue > 255 && !allowBiggerThan8Bit) throw new Error('8 Bit Overflow')
    return `0x${Math.abs(intValue).toString(16).toUpperCase()}`
}

    /**
     * Converts Binary Value to integer
     */
 export function fromBin(binaryValue: string): number{
    binaryValue = binaryValue.replace(' ','')
    return parseInt(binaryValue, 2)
}

    /**
     * Converts Hex Value to integer
    */
export function fromHex(hexValue: string): number{
    hexValue = hexValue.replace(' ','')
    return parseInt(hexValue, 16)

}


export function getInstructionFromOpcode(opcode: number){
    let instructionSet = INS as any
    let keys = Object.keys(instructionSet)
    for (let i = 0; i < keys.length; i++){
        if (typeof instructionSet[keys[i]]=== 'object'){
            let values = Object.values(instructionSet[keys[i]])
            if (values.includes(opcode)) return keys[i]
        } else {
            if (instructionSet[keys[i]] === opcode) return keys[i]
        }
    }

    return 'UNK'
}


