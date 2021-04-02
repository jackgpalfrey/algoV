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
    return intValue.toString(16)
}

    /**
     * Converts Binary Value to integer
     */
 export function fromBin(binaryValue: string): number{
    return parseInt(binaryValue, 2)
}

    /**
     * Converts Hex Value to integer
    */
export function fromHex(hexValue: string): number{
    return parseInt(hexValue, 16)
}





export default Helpers