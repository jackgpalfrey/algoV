import React, { useEffect, useState } from 'react'

import CPU from '../../util/VM/CPU'

const processor = new CPU()

const ComputerVisualiser: React.FC = () => {
    // const [processor, setProcessor]: any = useState()
    processor.writeByte(0, 255)
    processor.writeByte(65536, 255)
    
    useEffect(() => {
        
        // console.log(processor.readByte(0))
        setInterval(() => {
            
        }, 10000)
    }, [])
    return (
        <div></div>
    )
} 

export default ComputerVisualiser