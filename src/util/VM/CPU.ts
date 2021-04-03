import INS from './instructionSet'
import { toBin, toHex, fromBin, fromHex } from './helpers'
import Memory from './Memory'

//#region Interfaces
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
//#endregion

class CPU{

    //#region Type Declarations
    public bitSize: number
    public addressSize: number
    public maxDataValue: number
    private cycleSpeed: number

    public completedCycles: number
    public completedTicks: number
    public cycleLimit: number

    private PC: number
    private SP: number

    private registers: Registers
    private flags: Flags

    private partitionMap: any
    //#endregion

    //#region CPU Reset and Initialisation
    constructor(options: CPUOptions){
        console.log("Started")
        this.bitSize = 8
        this.addressSize = 16
        this.maxDataValue = 2**this.bitSize
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
    //#endregion

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

    private isValidData(data: number){
        return (typeof data === 'number' && data <= this.maxDataValue && data > 0)
    }

    //#endregion

    //#region Registry Management
    public getPC(){
        return this.PC
    }

    public setPC(newValue: number){
        if (typeof newValue !== 'number' || newValue >= 2**this.addressSize || newValue < 0) throw new Error('Invalid Address')
        this.PC = newValue
    }


    public getSP(){
        return this.SP
    }

    public setSP(newValue: number){
        if (typeof newValue !== 'number' || newValue >= 2**this.addressSize || newValue < 0) throw new Error('Invalid Address')
        this.SP = newValue
    }

    public getRegister(register: keyof Registers){
        return this.registers[register]
    }  

    public setRegister(register: keyof Registers, newValue: number){
        if (!this.isValidData(newValue)) throw new Error('Invalid Data')
        this.registers[register] = newValue
    }

    public getFlag(flag: keyof Flags){
        return this.flags[flag]
    }

    public setFlag(flag: keyof Flags, newValue: boolean){
        if (typeof newValue === 'boolean') throw new Error('Invalid Data')
        this.flags[flag] = newValue
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