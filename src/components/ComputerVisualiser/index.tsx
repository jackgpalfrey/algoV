import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex, getInstructionFromOpcode} from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    // CPU.writeByte(0,INS.JSR.ABS)
    // CPU.writeByte(1, fromBin('0000 1010'))
    // CPU.writeByte(2, fromBin('0000 0000'))

    // CPU.writeByte(3, INS.LDX.IMD)
    // CPU.writeByte(4, 222)
    // CPU.writeByte(5, INS.JMP.ABS)
    // CPU.writeByte(6, fromBin('1111 1100'))
    // CPU.writeByte(7, fromBin('1111 1111'))

    // CPU.writeByte(10, INS.LDA.ABS)
    // CPU.writeByte(11, fromBin('1111 1111'))
    // CPU.writeByte(12, fromBin('1111 1111'))
    // CPU.writeByte(13, INS.RTS)

    // CPU.writeByte(65535, 233)

    // CPU.writeByte(65532, INS.LDY.IMD)
    // CPU.writeByte(65533, 33)

    
    


    return (
        <div></div>
    )
} 

export default ComputerVisualiser