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

        
        this.mount(new Memory(this.bitSize, 2**16))

        
        
        
        this.reset()
        this.start()
    }

    public reset():void{
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

    /**
     * Gets the partition of requested address
     * @param address Decimal address of requested memory location
     * @returns [Starting address of partition, Final Address and reference of partition]
     */
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

    /**
     * Reads given memory address and returns value
     * @param address The Address to read from
     * @param errorOnInvalidAddress Should program crash with error if address does not exist
     * @returns Decimal value at memory address
     */
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

    /**
     * Writes Value to given memory address
     * @param address The address to write to
     * @param newValue The decimal value to write to given memory address
     * @param errorOnUnwriteable Should program crash with error if partition is unwriteable
     * @param errorOnInvalidAddress Should program crash with error if address does not exist
     * @returns Value at given address (Used to check if write was succesful)
     */
    public writeByte(address: number, newValue: number, errorOnUnwriteable:boolean = false, errorOnInvalidAddress:boolean = false):number | undefined{
        if (!this.isValidData(newValue)) throw new Error('Invalid Data')
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
    
    /**
     * Mounts given memory to partition map.
     * @param memory A instance of memory to mount to CPU
     * @returns The upper address and reference of memory partition
     */
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

    /**
     * Checks if given data is valid
     * @param data Data to check is permissable data
     * @returns true if value is permissable and false if not
     */
    private isValidData(data: number):boolean{
        return (typeof data === 'number' && data < this.maxDataValue && data > 0)
    }

    //#endregion

    //#region Registry Management
    
    /**
     * Gets value in program counter
     * @returns Value of Program Counter
     */
    public getPC(){
        return this.PC
    }

    /**
     * Sets Program Counter to given value
     * @param newValue Value to set PC to
     */
    public setPC(newValue: number){
        if (typeof newValue !== 'number' || newValue >= 2**this.addressSize || newValue < 0) throw new Error('Invalid Address')
        this.PC = newValue
    }

    /**
     * Increments (or decrements with negative value) the Program Counter by given amount
     * @param incrementBy The amount to increment Program Counter by (Negative means decrementing)
     */
    public incrementPC(incrementBy: number){
        this.PC += incrementBy
    }

    /**
     * Returns value of Stack Pointer
     * @returns Value of Stack Pointer
     */
    public getSP(){
        return this.SP
    }

    /**
     * Sets Stack Pointer to given value
     * @param newValue Value to set Stack Pointer to 
     */
    public setSP(newValue: number){
        if (typeof newValue !== 'number' || newValue >= 2**this.addressSize || newValue < 0) throw new Error('Invalid Address')
        this.SP = newValue
    }

    /**
     * Increments (or decrements with negative value) the Stack Pointer by given amount
     * @param incrementBy The amount to increment Stack Pointer by (Negative means decrementing)
     */
     public incrementSP(incrementBy: number){
        this.SP += incrementBy
    }

    /**
     * Returns the value of the given register
     * @param register The Register to read from
     * @returns The Value of given register
     */
    public getRegister(register: keyof Registers){
        return this.registers[register]
    }  

    /**
     * Sets the value of given register to given value
     * @param register The Register to write to
     * @param newValue The Value to set given register to
     */
    public setRegister(register: keyof Registers, newValue: number){
        if (!this.isValidData(newValue)) throw new Error('Invalid Data')
        this.registers[register] = newValue
    }

    /**
     * Returns the value of a given flag
     * @param flag Flags to return value of
     * @returns The Value of the given flag
     */
    public getFlag(flag: keyof Flags){
        return this.flags[flag]
    }

    /**
     * Sets given flag to given value
     * @param flag Flag to write to
     * @param newValue The Value to set given flag to
     */
    public setFlag(flag: keyof Flags, newValue: boolean){
        if (typeof newValue === 'boolean') throw new Error('Invalid Data')
        this.flags[flag] = newValue
    }


    //#endregion

    //#region FDE Cycle

    /**
     * Gets the next instruction
     * @returns The Next instruction pointed to by PC
     */
    private fetchNextInstruction(){
        let instruction = this.readByte(this.PC)
        this.PC++
        this.completedTicks++
        return instruction
    }

    /**
     * Executes and handles instruction execution
     * @param instruction The decimal opcode of instruction to execute
     */
    private executeInstruction(instruction: number){
        switch(instruction){
            default:
                console.log(`Invalid Instruction ${toHex(instruction)}`)
                this.completeCycle()
                break;
        }
    }

    /**
     * Completes cycle and restarts FDE cycle
     */
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

    /**
     * Handles fetching and then executing instructions
     */
    private FDE(){
        let instruction = this.fetchNextInstruction()
        this.executeInstruction(instruction)

    }

    /**
     * Starts clock
     */
    private start(){
        setTimeout(() => {
            this.FDE()
        }, 1000)
        
    }
    //#endregion

}

export default CPU