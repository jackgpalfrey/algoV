import Clock from './Clock'
import CPU from './CPU'
import EventEmitter from './EventEmitter'
import Memory from './Memory'
import MemoryMapper from './MemoryMapper'

class VM extends EventEmitter{
    public Processor: CPU
    public RAM: Memory
    public memoryMap: MemoryMapper
    public clock: Clock

    constructor(){
        super()
        this.memoryMap = new MemoryMapper(8, 16)
        this.Processor = new CPU(this,{cycleSpeed: 1000})
        this.RAM = new Memory(8, 65536)
        this.memoryMap.mount(this.RAM)

        this.clock = new Clock()

        this.createRequiredEventListeners()
        this.createDebugEventListeners()

    }


    public start(){
        this.clock.startLoop()
    }

    private createDebugEventListeners(){
        this.Processor.on('START', () => {
            console.log('\n\n\n\n\n\n')
            console.log("CPU Started")
        })
        
    }

    private createRequiredEventListeners(){
        this.clock.on('step', ({ completeCycle }) => {
            this.Processor.FDE()
        })
    }

}


export default VM