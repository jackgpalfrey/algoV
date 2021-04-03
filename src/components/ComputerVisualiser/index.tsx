import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex } from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    CPU.writeByte(0,INS.LDA_ZP)
    CPU.writeByte(1, 255)
    CPU.writeByte(255, 42)
    
    return (
        <div></div>
    )
} 

export default ComputerVisualiser