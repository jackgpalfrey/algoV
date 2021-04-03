import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex } from '../../util/VM/helpers'
import CPU from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const processor = new CPU({cycleLimit: 5})


const ComputerVisualiser: React.FC = () => {
    // processor.writeByte(0, INS.LDA_ABS)
    console.log(`0: ${toHex(processor.readByte(0))}`)
    console.log()
    
    
    return (
        <div></div>
    )
} 

export default ComputerVisualiser