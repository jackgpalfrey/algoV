class Helpers{

    


   

    
}


    /**
     * Converts integer to binary value
     */
 export function toBin(intValue: number): string{
    return intValue.toString(2)
}

    /**
     * Converts integer to hex value
     */
  export function toHex(intValue: number): string{
    return `0x${intValue.toString(16).toUpperCase()}`
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





export default Helpers