import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex } from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    CPU.writeByte(0,10)
    CPU.writeByte(5, 255)
    
    return (
        <div></div>
    )
} 

export default ComputerVisualiser