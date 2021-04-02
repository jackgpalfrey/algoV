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


class CPU{
    public bitSize: number
    public addressSize: number

    public completedCycles: number
    public completedTicks: number

    public PC: number
    public SP: number

    public registers: Registers
    public flags: Flags

    private partitionMap: any

    constructor(){
        console.log("Started")
        this.bitSize = 8
        this.addressSize = 16

        this.completedCycles = 0
        this.completedTicks = 0

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

        
        this.mount(new Memory(this.bitSize, 2**16))
        
        
        
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

    private getPartitionOfAddress(address: number): [string, string]{
        let partitionAddresses = Object.keys(this.partitionMap)
        let lastAddress = -1
        for (let i = 0; i < partitionAddresses.length; i++){
            if (address <= parseInt(partitionAddresses[i]) && address > lastAddress ){
                return [partitionAddresses[i - 1] || '0', partitionAddresses[i]]
            }

            lastAddress = parseInt(partitionAddresses[i])
        }

        throw new Error(`No Memory At Location ${address}`)

    }

    public readByte(address: number){
        let [startAddress, endAddress] = this.getPartitionOfAddress(address)
        let mem: Memory = this.partitionMap[endAddress]
        return mem.readByte(address - parseInt(startAddress))
        
    }

    public writeByte(address: number, newValue: number, errorOnIssue = false){
        let [startAddress, endAddress] = this.getPartitionOfAddress(address)
        let mem: Memory = this.partitionMap[endAddress]
        try{
            return mem.writeByte(address - parseInt(startAddress), 255)
        } catch {
            if (errorOnIssue) throw new Error("Couldn't Write")
        }
        
    }
    
    public mount(memory: Memory): number{
        let currentMap = this.partitionMap
        let currentLocations = Object.keys(currentMap)
        let startAddress = 0
        if (currentLocations.length !== 0){
            startAddress = parseInt(currentLocations[currentLocations.length - 1])
        }
        let endAddress = startAddress + memory.addressSpaceSize
        if (endAddress > 2**this.addressSize){
            let error = new Error("Address Too Large")
            throw error
        } 

        this.partitionMap[endAddress] = memory

        return endAddress



    }


    private fetchNextInstruction(){
        let instruction = this.readByte(this.PC)
        this.PC++
        this.completedTicks++
        return instruction
    }

    private executeInstruction(instruction: number){
        switch(instruction){
            default:
                console.log(`Invalid Instruction ${instruction}`)
                this.completeCycle()
                break;
        }
    }

    private completeCycle(){
        // return
        this.completedCycles++
        setTimeout(() => {
            this.FDE()
        }, 5000)
        
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
}

export default CPU