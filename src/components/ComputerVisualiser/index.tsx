import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex } from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    CPU.setRegister('X', 1)
    CPU.writeByte(0, INS.LDY.ABSX)
    CPU.writeByte(1, fromBin('1111 1110'))
    CPU.writeByte(2, fromBin('1111 1111'))
    CPU.writeByte(65535, 23)


    return (
        <div></div>
    )
} 

export default ComputerVisualiser