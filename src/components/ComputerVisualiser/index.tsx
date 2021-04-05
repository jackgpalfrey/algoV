import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex, getInstructionFromOpcode} from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    CPU.loadProgram([   'A9','FF', // LDA IMD
                        '85','90',
                        '8D','00','80',
                        '49','CC',
                        '4C','0','0'

                    ], 'HEX')
    // console.log(fromHex('00'))
    // CPU.setRegister('A', 22)
    // CPU.writeByte(0, INS.PHP)
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

    // CPU.writeByte(0, INS.BIT.ZP)

    
    


    return (
        <div></div>
    )
} 

export default ComputerVisualiser