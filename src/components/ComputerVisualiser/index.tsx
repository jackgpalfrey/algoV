import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex, getInstructionFromOpcode} from '../../util/VM/helpers'
import VM from '../../util/VM/CPU'
import INS from '../../util/VM/instructionSet'

const CPU = new VM({cycleLimit: 10, cycleSpeed:1000})


const ComputerVisualiser: React.FC = () => {
    // CPU.loadProgram([   'A9','FF', // LDA IMD
    //                     '85','90',
    //                     '8D','00','80',
    //                     '49','CC',
    //                     '4C','0','0'

    //                 ], 'HEX')


    CPU.loadProgram([   
                        'A9','00', // LDA IMD
                        '85','42',
                        'E6','42',
                        'A6','42',
                        'E8'

                    ], 'HEX')


    
    


    return (
        <div></div>
    )
} 

export default ComputerVisualiser