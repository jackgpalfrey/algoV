import INS from './instructionSet'
import { toBin, toHex, fromBin, fromHex } from './helpers'
import Memory from './Memory'
export interface Registers{
    A: number // Acumulator
    X: number // Index X Register
    Y: number // Index Y Register
}

export interface Flags{
    C: boolean // Carry Flag
    Z: boolean // Zero Flag
    I: boolean // Interupt Disable Flag
    D: boolean // Decimal Mode Flag
    B: boolean // Break Flag
    V: boolean // Overflow Flag
    N: boolean // Negative Flag

}

export interface CPUOptions{
    /**
     * The Number of Cycles that can execute before terminating
     */
    cycleLimit?: number
    /**
     * The time between between each FDE cycle
     */
    cycleSpeed?: number

}


class CPU{
    public bitSize: number
    public addressSize: number
    private cycleSpeed: number

    public completedCycles: number
    public completedTicks: number
    public cycleLimit: number

    public PC: number
    public SP: number

    public registers: Registers
    public flags: Flags

    private partitionMap: any

    constructor(options: CPUOptions){
        console.log("Started")
        this.bitSize = 8
        this.addressSize = 16
        this.cycleSpeed = options.cycleSpeed || 1000 //ms

        this.completedCycles = 0
        this.completedTicks = 0
        this.cycleLimit = options.cycleLimit || Infinity

        this.PC = 0 // Program Counter
        this.SP = 0 // Stack Pointer

        this.registers = {
            A: 0, // Acumulator
            X: 0, // Index X Register
            Y: 0, // Index Y Register
        }

        this.flags = {
            C: false, // Carry Flag
            Z: false, // Zero Flag
            I: false, // Interupt Disable Flag
            D: false, // Decimal Mode Flag
            B: false, // Break Flag
            V: false, // Overflow Flag
            N: false, // Negative Flag
        }


        this.partitionMap = {}

        
        this.mount(new Memory(this.bitSize, 2**4))
        this.mount(new Memory(this.bitSize, 2**4))

        
        
        
        this.reset()
        this.start()
    }

    public reset(){
        this.PC = 0
        this.SP = 255

        this.registers = {
            A: 0, // Acumulator
            X: 0, // Index X Register
            Y: 0, // Index Y Register
        }

        this.flags = {
            C: false, // Carry Flag
            Z: false, // Zero Flag
            I: false, // Interupt Disable Flag
            D: false, // Decimal Mode Flag
            B: false, // Break Flag
            V: false, // Overflow Flag
            N: false // Negative Flag
        }

        // if (this.startupTest() === true) this.start()
    }

    //#region Memory Managment
    private getPartitionOfAddress(address: number): [string, string]{
        let partitionAddresses = Object.keys(this.partitionMap)
        let lastAddress = -1
        for (let i = 0; i < partitionAddresses.length; i++){
            let partitionAddress = parseInt(partitionAddresses[i])
            if (lastAddress !== -1) partitionAddress += 1


            if (address <= partitionAddress && address > lastAddress ){
                return [partitionAddresses[i - 1] || '0', partitionAddresses[i]]
            }

            lastAddress = parseInt(partitionAddresses[i])
        }

        throw new Error(`No Memory At Location ${address}`)

    }

    public readByte(address: number, errorOnInvalidAddress:boolean = false): number{
        let startAddress;
        let endAddress;
        try {
            [startAddress, endAddress] = this.getPartitionOfAddress(address)
        } catch (err) {
            if (errorOnInvalidAddress) throw err
            return 0
        }
        let mem: Memory = this.partitionMap[endAddress]

        let readAddress:number = address - parseInt(startAddress)
        if (startAddress !== '0') readAddress -= 1
        
        return mem.readByte(readAddress)
        
    }

    public writeByte(address: number, newValue: number, errorOnUnwriteable:boolean = false, errorOnInvalidAddress:boolean = false){
        let startAddress;
        let endAddress;
        try {
            [startAddress, endAddress] = this.getPartitionOfAddress(address)
        } catch (err) {
            if (errorOnInvalidAddress) throw err
            return
        }
        
        let mem: Memory = this.partitionMap[endAddress]


        let writeAddress:number = address - parseInt(startAddress)
        if (startAddress !== '0') writeAddress -= 1

        try{
            return mem.writeByte(writeAddress, newValue)
        } catch {
            if (errorOnUnwriteable) throw new Error("Couldn't Write")
        }
        
    }
    
    public mount(memory: Memory): number{
        let currentMap = this.partitionMap
        let currentLocations = Object.keys(currentMap)
        let startAddress = 0
        if (currentLocations.length !== 0){
            startAddress = parseInt(currentLocations[currentLocations.length - 1])
        }
        let endAddress = startAddress + memory.addressSpaceSize - 1
        if (endAddress > 2**this.addressSize){
            let error = new Error("Address Too Large")
            throw error
        } 

        this.partitionMap[endAddress] = memory

        return endAddress



    }

    //#endregion

    //#region FDE Cycle
    private fetchNextInstruction(){
        let instruction = this.readByte(this.PC)
        this.PC++
        this.completedTicks++
        return instruction
    }

    private executeInstruction(instruction: number){
        switch(instruction){
            default:
                console.log(`Invalid Instruction ${toHex(instruction)}`)
                this.completeCycle()
                break;
        }
    }

    private completeCycle(){
        // return
        this.completedCycles++
        setTimeout(() => {
            if (this.completedCycles <= this.cycleLimit){
                this.FDE()
            } else {
                throw new Error('Cycle Limit Reached')
            }
            
        }, this.cycleSpeed)
        
    }

    private FDE(){
        let instruction = this.fetchNextInstruction()
        this.executeInstruction(instruction)

    }

    private start(){
        setTimeout(() => {
            this.FDE()
        }, 1000)
        
        return
    }
    //#endregion
}

export default CPU