import React from 'react';
import { fromHex, getAddressingModeFromOpcode, getInstructionFromOpcode, toHex } from '../../../util/VM/helpers';

interface props{
    memory: number[]
}


const AssemblyAnalysisCard:React.FC<props> = ({ memory }) => {
    function disassemble(memoryArray: number[]){
        let pointer = 0
        let finalArray: string[] = []

        while (true){
            if (pointer > memoryArray.length - 1){
                break;
            }

            let instruction = getInstructionFromOpcode(memoryArray[pointer])
            let addressingMode = getAddressingModeFromOpcode(memoryArray[pointer], instruction)

            let arr = []

            arr.push(`${pointer}: `)
            switch (instruction){
                //#region Loading
                case 'LDA':
                    arr.push('LDA')
                    switch(addressingMode){
                        case 'IMD':
                            pointer++
                            arr.push(`#${memoryArray[pointer]}`)
                            break;

                        case 'ZP':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}`)
                            break;
                        
                        case 'ZPX':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])},X`)
                            break;

                        case 'ABS':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])}`)
                            pointer++
                            break;

                        case 'ABSX':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])},X`)
                            pointer++
                            break;

                        case 'ABSY':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])},Y`)
                            pointer++
                            break;

                        case 'INDX':
                            pointer++
                            arr.push(`($${toHex(memoryArray[pointer])},X)`)
                            break;

                        case 'INDY':
                            pointer++
                            arr.push(`($${toHex(memoryArray[pointer])}),Y`)
                            break;
                        }
                    if (arr.length === 3) finalArray.push(arr.join(' '))
                    break;
            
                case 'LDX':
                    arr.push('LDX')
                    switch(addressingMode){
                        case 'IMD':
                            pointer++
                            arr.push(`#${memoryArray[pointer]}`)
                            break;

                        case 'ZP':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}`)
                            break;
                        
                        case 'ZPY':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])},Y`)
                            break;

                        case 'ABS':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])}`)
                            pointer++
                            break;

                        case 'ABSY':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])},Y`)
                            pointer++
                            break;
                        }
                    if (arr.length === 3) finalArray.push(arr.join(' '))
                    break;
            
                case 'LDY':
                    arr.push('LDY')
                    switch(addressingMode){
                        case 'IMD':
                            pointer++
                            arr.push(`#${memoryArray[pointer]}`)
                            break;

                        case 'ZP':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}`)
                            break;
                        
                        case 'ZPX':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])},X`)
                            break;

                        case 'ABS':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])}`)
                            pointer++
                            break;

                        case 'ABSX':
                            pointer++
                            arr.push(`$${toHex(memoryArray[pointer])}${toHex(memoryArray[pointer + 1])},X`)
                            pointer++
                            break;
                        }
                    if (arr.length === 3) finalArray.push(arr.join(' '))
                    break;
            
                //#endregion
                
                //#region Stack Management
                case 'TSX':
                    arr.push('TSX')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'TXS': 
                    arr.push('TXS')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'PHA': 
                    arr.push('PHA')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'PHP': 
                    arr.push('PHP')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'PLA': 
                    arr.push('PLA')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'PLP': 
                    arr.push('PLP')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;

                //#endregion
            
                //#region Flag Management
                case 'CLC': 
                    arr.push('CLC')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'CLD': 
                    arr.push('CLD')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'CLI':
                    arr.push('CLI')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'CLV': 
                    arr.push('CLV')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'SEC': 
                    arr.push('SEC')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'SED': 
                    arr.push('SED')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;
                case 'SEI':
                    arr.push('SEI')
                    if (arr.length === 2) finalArray.push(arr.join(' '))
                    break;

                //#endregion
            
            
            }
            pointer++
        }
        
        return finalArray
    }


    function getAssembly(memory: number[]){
        let arr = disassemble(memory)

        return arr.map((value) => {
            return <p>{value}</p>
        })
    }



    return (
        <div>
            <p>{getAssembly(memory)}</p>
        </div>
    )
}

export default AssemblyAnalysisCard