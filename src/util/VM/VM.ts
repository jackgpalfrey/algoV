import CPU from './CPU'
import Memory from './Memory'

class VM{
    processor: CPU | undefined
    RAM: Memory | undefined
    constructor(){
        this.reset()
    }


    public reset(){
        this.processor = new CPU({})

        this.RAM = new Memory(8, 2**16)
        this.processor.mount(this.RAM)
    }
}

export default VM