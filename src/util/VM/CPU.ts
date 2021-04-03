import { fromBin, toBin, toHex } from './helpers'
import Memory from './Memory'
import INS from './instructionSet'
import InstructionSet from './instructionSet'

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
    public readByte(address: number, errorOnInvalidAddress:boolean = true): number{
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
        
        this.completedTicks++
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
    public writeByte(address: number, newValue: number, errorOnUnwriteable:boolean = true, errorOnInvalidAddress:boolean = true):number | undefined{
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
        return (typeof data === 'number' && data < this.maxDataValue && data >= 0)
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
        let newVal = this.PC + incrementBy
        this.setPC(newVal)
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
        if (typeof newValue !== 'number' || newValue >= 256 || newValue < 0) throw new Error('Invalid Address')
        this.SP = newValue
    }

    /**
     * Increments (or decrements with negative value) the Stack Pointer by given amount
     * @param incrementBy The amount to increment Stack Pointer by (Negative means decrementing)
     */
     public incrementSP(incrementBy: number){
        let newVal = this.SP + incrementBy
        this.setSP(newVal)
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
        if (typeof newValue !== 'boolean') throw new Error('Invalid Data')
        this.flags[flag] = newValue
    }


    //#endregion

    //#region Instruction Helper Functions
    private LDA_setFlags(){
        if (this.getRegister('A') === 0) this.setFlag('Z', true)
        if (toBin(this.getRegister('A'))[0] === '1') this.setFlag('N', true)
    }

    private LDX_setFlags(){
        if (this.getRegister('X') === 0) this.setFlag('Z', true)
        if (toBin(this.getRegister('X'))[0] === '1') this.setFlag('N', true)
    }

    private LDY_setFlags(){
        if (this.getRegister('Y') === 0) this.setFlag('Z', true)
        if (toBin(this.getRegister('Y'))[0] === '1') this.setFlag('N', true)
    }

    private getLittleEndianWordAddress(address1:number, address2:number){
        let address1Bin = toBin(address1)
        let address2Bin = toBin(address2)
        let finalAddressBin = address2Bin + address1Bin
        return fromBin(finalAddressBin)
    }
    //#endregion
    
    //#region FDE Cycle

    /**
     * Gets the next instruction
     * @returns The Next instruction pointed to by PC
     */
    private fetchNextInstruction(){
        return this.fetchNextByte()
    }

    /**
     * Gets byte currently at PC and increments it
     * @returns Byte at PC
     */
    private fetchNextByte(){
        let data = this.readByte(this.PC)
        this.PC++
        return data
    }

    /**
     * Executes and handles instruction execution
     * @param instruction The decimal opcode of instruction to execute
     */
    private executeInstruction(instruction: number){
        switch(instruction){
            //#region LDA
            case INS.LDA.IMD:
                // Reads Next Byte
                let LDA_IMD_value = this.fetchNextByte() // Explicit Value

                // Loads value to A
                this.setRegister('A', LDA_IMD_value)

                // Sets Flags
                this.LDA_setFlags()        
                break;
            
            case INS.LDA.ZP:
                // Reads Address at Next Byte
                let LDA_ZP_address = this.fetchNextByte()
                if (LDA_ZP_address > 255) LDA_ZP_address -= 256 // Address Rolls over if bigger than 8 bit limit (Shouldn't actually be possible but just to be safe)

                // Reads Value at Address
                let LDA_ZP_value = this.readByte(LDA_ZP_address)

                // Loads Next Bytes Value to A
                this.setRegister('A', LDA_ZP_value)
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.ZPX:
                // Reads Address at Next Byte
                let LDA_ZPX_address = this.fetchNextByte()
                LDA_ZPX_address += this.getRegister('X')
                this.completedTicks++

                if (LDA_ZPX_address > 255) LDA_ZPX_address -= 256 // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDA_ZPX_value = this.readByte(LDA_ZPX_address)
                // Loads Next Bytes Value to A
                this.setRegister('A', LDA_ZPX_value)
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.ABS:
                // Reads Address at Next Byte
                let LDA_ABS_address1 = this.fetchNextByte()
                let LDA_ABS_address2 = this.fetchNextByte()

                let LDA_ABS_finalAddress = this.getLittleEndianWordAddress(LDA_ABS_address1, LDA_ABS_address2) // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDA_ABS_value = this.readByte(LDA_ABS_finalAddress)
                // Loads Next Bytes Value to A
                this.setRegister('A', LDA_ABS_value)
                
                // Sets falgs
                this.LDA_setFlags()
                break;
        
            case INS.LDA.ABSX:
                // Reads Address at Next Byte
                let LDA_ABSX_address1 = this.fetchNextByte()
                let LDA_ABSX_address2 = this.fetchNextByte()

                let LDA_ABSX_finalAddress = this.getLittleEndianWordAddress(LDA_ABSX_address1, LDA_ABSX_address2) // Address Rolls over if bigger than 8 bit limit 
                
                // Add X Register and checks if page boundary is crossed
                let LDA_ABSX_finalAddressX = LDA_ABSX_finalAddress + this.getRegister('X')
                if (LDA_ABSX_finalAddressX - LDA_ABSX_finalAddress >= 255) this.completedTicks++

                // Reads Value at Address
                let LDA_ABSX_value = this.readByte(LDA_ABSX_finalAddressX)
                // Loads Next Bytes Value to A
                this.setRegister('A', LDA_ABSX_value)
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.ABSY:
                // Reads Address at Next Byte
                let LDA_ABSY_address1 = this.fetchNextByte()
                let LDA_ABSY_address2 = this.fetchNextByte()

                let LDA_ABSY_finalAddress = this.getLittleEndianWordAddress(LDA_ABSY_address1, LDA_ABSY_address2) // Address Rolls over if bigger than 8 bit limit 
                
                // Add X Register and checks if page boundary is crossed
                let LDA_ABSY_finalAddressY = LDA_ABSY_finalAddress + this.getRegister('Y')
                if (LDA_ABSY_finalAddressY - LDA_ABSY_finalAddress >= 255) this.completedTicks++

                // Reads Value at Address
                let LDA_ABSY_value = this.readByte(LDA_ABSY_finalAddressY)
                // Loads Next Bytes Value to A
                this.setRegister('A', LDA_ABSY_value)
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.INDX:
                // Reads Next Byte
                let LDA_INDX_ZPAddress = this.fetchNextByte() // Explicit Value
                LDA_INDX_ZPAddress += this.getRegister('X')
                this.completedTicks++
                
                if (LDA_INDX_ZPAddress > 255) LDA_INDX_ZPAddress -= 256 // ZP Address Wraps Around

                let LDA_INDX_address1 = this.readByte(LDA_INDX_ZPAddress)
                let LDA_INDX_address2 = this.readByte(LDA_INDX_ZPAddress + 1)

                let LDA_INDX_finalAddress = this.getLittleEndianWordAddress(LDA_INDX_address1, LDA_INDX_address2)

                let LDA_INDX_value = this.readByte(LDA_INDX_finalAddress)

                this.setRegister('A', LDA_INDX_value)
                // Sets Flags
                this.LDA_setFlags()        
                break;

            case INS.LDA.INDY:
                let LDA_INDY_ZPAddress = this.fetchNextByte()
                let LDA_INDY_address1 = this.readByte(LDA_INDY_ZPAddress)
                let LDA_INDY_address2 = this.readByte(LDA_INDY_ZPAddress + 1)
                let LDA_INDY_finalAddress = this.getLittleEndianWordAddress(LDA_INDY_address1, LDA_INDY_address2)
                let LDA_INDY_finalAddressY = LDA_INDY_finalAddress + this.getRegister('Y')

                // Checks if page boundary is crosssed
                if (LDA_INDY_finalAddressY - LDA_INDY_finalAddress >= 255) this.completedTicks++

                let LDA_INDY_value = this.readByte(LDA_INDY_finalAddressY)
                this.setRegister('A', LDA_INDY_value)
                break;
        
            //#endregion
            
            //#region LDX
            case INS.LDX.IMD:
                // Reads Next Byte
                let LDX_IMD_value = this.fetchNextByte() // Explicit Value

                // Loads value to A
                this.setRegister('X', LDX_IMD_value)

                // Sets Flags
                this.LDX_setFlags()        
                break;
            
            case INS.LDX.ZP:
                // Reads Address at Next Byte
                let LDX_ZP_address = this.fetchNextByte()
                if (LDX_ZP_address > 255) LDX_ZP_address -= 256 // Address Rolls over if bigger than 8 bit limit (Shouldn't actually be possible but just to be safe)

                // Reads Value at Address
                let LDX_ZP_value = this.readByte(LDX_ZP_address)

                // Loads Next Bytes Value to A
                this.setRegister('X', LDX_ZP_value)
                
                // Sets falgs
                this.LDX_setFlags()
            break;
                
            case INS.LDX.ZPY:
                // Reads Address at Next Byte
                let LDX_ZPY_address = this.fetchNextByte()
                LDX_ZPY_address += this.getRegister('Y')
                this.completedTicks++

                if (LDX_ZPY_address > 255) LDX_ZPY_address -= 256 // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDX_ZPY_value = this.readByte(LDX_ZPY_address)
                // Loads Next Bytes Value to A
                this.setRegister('X', LDX_ZPY_value)
                
                // Sets falgs
                this.LDX_setFlags()
                break;
            
            case INS.LDX.ABS:
                // Reads Address at Next Byte
                let LDX_ABS_address1 = this.fetchNextByte()
                let LDX_ABS_address2 = this.fetchNextByte()

                let LDX_ABS_finalAddress = this.getLittleEndianWordAddress(LDX_ABS_address1, LDX_ABS_address2) // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDX_ABS_value = this.readByte(LDX_ABS_finalAddress)
                // Loads Next Bytes Value to A
                this.setRegister('X', LDX_ABS_value)
                
                // Sets flags
                this.LDX_setFlags()
                break;
        
            case INS.LDX.ABSY:
                // Reads Address at Next Byte
                let LDX_ABSY_address1 = this.fetchNextByte()
                let LDX_ABSY_address2 = this.fetchNextByte()

                let LDX_ABSY_finalAddress = this.getLittleEndianWordAddress(LDX_ABSY_address1, LDX_ABSY_address2) // Address Rolls over if bigger than 8 bit limit 
                
                // Add X Register and checks if page boundary is crossed
                let LDX_ABSY_finalAddressY = LDX_ABSY_finalAddress + this.getRegister('Y')
                if (LDX_ABSY_finalAddressY - LDX_ABSY_finalAddress >= 255) this.completedTicks++

                // Reads Value at Address
                let LDX_ABSY_value = this.readByte(LDX_ABSY_finalAddressY)
                // Loads Next Bytes Value to A
                this.setRegister('X', LDX_ABSY_value)
                
                // Sets falgs
                this.LDX_setFlags()
                break;    
            //#endregion

            //#region LDY
            case INS.LDY.IMD:
                // Reads Next Byte
                let LDY_IMD_value = this.fetchNextByte() // Explicit Value

                // Loads value to A
                this.setRegister('Y', LDY_IMD_value)

                // Sets Flags
                this.LDY_setFlags()        
                break;
            
            case INS.LDY.ZP:
                // Reads Address at Next Byte
                let LDY_ZP_address = this.fetchNextByte()
                if (LDY_ZP_address > 255) LDY_ZP_address -= 256 // Address Rolls over if bigger than 8 bit limit (Shouldn't actually be possible but just to be safe)

                // Reads Value at Address
                let LDY_ZP_value = this.readByte(LDY_ZP_address)

                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ZP_value)
                
                // Sets falgs
                this.LDY_setFlags()
            break;
                
            case INS.LDY.ZPX:
                // Reads Address at Next Byte
                let LDY_ZPX_address = this.fetchNextByte()
                LDY_ZPX_address += this.getRegister('X')
                this.completedTicks++

                if (LDY_ZPX_address > 255) LDY_ZPX_address -= 256 // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDY_ZPX_value = this.readByte(LDY_ZPX_address)
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ZPX_value)
                
                // Sets falgs
                this.LDY_setFlags()
                break;
            
            case INS.LDY.ABS:
                // Reads Address at Next Byte
                let LDY_ABS_address1 = this.fetchNextByte()
                let LDY_ABS_address2 = this.fetchNextByte()

                let LDY_ABS_finalAddress = this.getLittleEndianWordAddress(LDY_ABS_address1, LDY_ABS_address2) // Address Rolls over if bigger than 8 bit limit 
                // Reads Value at Address
                let LDY_ABS_value = this.readByte(LDY_ABS_finalAddress)
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ABS_value)
                
                // Sets flags
                this.LDY_setFlags()
                break;
        
            case INS.LDY.ABSX:
                // Reads Address at Next Byte
                let LDY_ABSX_address1 = this.fetchNextByte()
                let LDY_ABSX_address2 = this.fetchNextByte()

                let LDY_ABSX_finalAddress = this.getLittleEndianWordAddress(LDY_ABSX_address1, LDY_ABSX_address2) // Address Rolls over if bigger than 8 bit limit 
                
                // Add X Register and checks if page boundary is crossed
                let LDY_ABSX_finalAddressY = LDY_ABSX_finalAddress + this.getRegister('X')
                if (LDY_ABSX_finalAddressY - LDY_ABSX_finalAddress >= 255) this.completedTicks++

                // Reads Value at Address
                let LDY_ABSX_value = this.readByte(LDY_ABSX_finalAddressY)
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ABSX_value)
                
                // Sets falgs
                this.LDY_setFlags()
                break;    
            //#endregion




            default:
                console.log(`Invalid Instruction ${toHex(instruction)}`)
                break;


        }

        console.log(this.registers)
        console.log(this.flags)
        this.completeCycle()
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