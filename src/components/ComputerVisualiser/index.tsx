import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex } from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10})


const ComputerVisualiser: React.FC = () => {
    CPU.writeByte(0, INS.LDA_INDY)
    CPU.writeByte(1, fromBin('1111 1110'))
    CPU.writeByte(254, fromBin('1111 1110'))
    CPU.writeByte(255, fromBin('1111 1111'))
    CPU.writeByte(65535, 232)


    return (
        <div></div>
    )
} 

export default ComputerVisualiser