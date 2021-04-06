import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex, calculateSigned8BitBinaryValue, bitwiseNegate, byteAdd} from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'
import TestSuite from '../../util/VM/TestSuite'
import EventEmitter from '../../util/VM/EventEmitter'

const CPU = new VM({cycleLimit: 20, cycleSpeed:1000})
const tester = new TestSuite(CPU)
let listener = new EventEmitter()


const ComputerVisualiser: React.FC = () => {
    // CPU.setFlag('C', false)
    // CPU.setRegister('A', 2)
    // CPU.writeByte(0, INS.SBC.IMD)
    // CPU.writeByte(1,1)

    CPU.setRegister('A', 1)
    CPU.writeByte(0, INS.LSR.ACC)

    // FOR LOOP
    // CPU.loadProgram([
    //     'A9','00',
    //     '18',
    //     '69','08',
    //     'C9','18',
    //     'D0','FA',
    //     'A2','14'
    // ], 'HEX')
    
    
    return (
        <div></div>
    )
} 

export default ComputerVisualiser