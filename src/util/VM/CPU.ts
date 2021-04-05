import { fromBin, toBin, toHex, getInstructionFromOpcode, fromHex, getAddressingModeFromOpcode, calculateSigned8BitBinaryValue } from './helpers'
import Memory from './Memory'
import INS from './instructionSet'

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
    Unused: boolean // Unused Flag
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
        // DEBUG STUFF
        console.log('\n\n\n\n\n\n')
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
            /**Carry Flag */
            C: false, // Carry Flag
            Z: false, // Zero Flag
            I: false, // Interupt Disable Flag
            D: false, // Decimal Mode Flag
            B: false, // Break Flag
            Unused: true, // Unused Flag
            V: false, // Overflow Flag
            N: false, // Negative Flag
        }


        this.partitionMap = {}

        
        this.mount(new Memory(this.bitSize, 2**16))

        
        
        
        this.reset()
        this.start()
    }

    public reset():void{
        this.PC = 0 // Program Counter
        this.SP = 255   // Stack Pointer (Stack between 256 - 511, inclusive, so actual value is 0x01[SP])

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
            Unused: true, // Unused Flag
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

        this.completedTicks++
        let writeAddress:number = address - parseInt(startAddress)
        if (startAddress !== '0') writeAddress -= 1

        try{
            return mem.writeByte(writeAddress, newValue)
        } catch {
            if (errorOnUnwriteable) throw new Error("Couldn't Write")
        }
        
    }

    public pushStack(newValue: number){
        let address = this.getSPFullAddress()
        console.log(address)
        this.writeByte(address, newValue)
        this.incrementSP(-1)
    }

    public popStack(){
        let address = this.getSPFullAddress()
        this.completedTicks++
        let value = this.readByte(address + 1)
        this.incrementSP(1)
        return value
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
        if (typeof newValue !== 'number' || newValue >= 2**this.addressSize || newValue < 0) throw new Error(`Invalid Address ${newValue}`)
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

    public getSPFullAddress(){
        return this.SP + 256
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

    public getFlagByte(){
        let values = Object.values(this.flags).reverse()
        let stringifiedValues = values.join('')
        return stringifiedValues.replaceAll('true', '1').replaceAll('false','0')

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

    public setFlagByte(byte: number){
        let byteBin = toBin(byte)
        let byteArray = byteBin.split('').reverse()
        let flags = Object.keys(this.flags)
        for (let i = 0; i < byteArray.length; i++){
            let flagObj = this.flags as any
            let key = flags[i]
            flagObj[key] =  byteArray[i] === '1' ? true : false
        }
        this.completedCycles += 2
    }

    


    //#endregion

    //#region Instruction Helper Functions

    //#region Addressing Modes
    /**
     * Gets next byte in PC and returns the value at that address
     * @returns Zero Page Address
     */
    private addrModeZP(){
        let ZPaddress = this.fetchNextByte()  // Gets Zero Page Address at next location
        if (ZPaddress > 255)  ZPaddress -= 256 // Rolls address over if bigger than Zero Page Size
        return ZPaddress // Returns address
    }

    private addrModeZPX(){
        // Reads Address At Next Byte
        let address = this.fetchNextByte()
        address += this.getRegister('X')
        this.completedTicks++

        if (address > 255) address -= 256 // Address Rolls over if bigger than 8 bit limit 

        return address
    }

    private addrModeZPY(){
        // Reads Address at Next Byte
        let address = this.fetchNextByte()
        address += this.getRegister('Y')
        this.completedTicks++

        if (address > 255) address -= 256 // Address Rolls over if bigger than 8 bit limit 
        // Reads Value at Address
        return address
    }
    
    private addrModeABS(){
        // Reads Address at Next Byte
        let address1 = this.fetchNextByte()
        let address2 = this.fetchNextByte()

        let finalAddress = this.getLittleEndianWordAddress(address1, address2) // Address Rolls over if bigger than 8 bit limit 
        // Reads Value at Address
        return finalAddress
    }

    private addrModeABSX(alwaysUseAdditionalTick:boolean = false){
        // Reads Address at Next Byte
        let address1 = this.fetchNextByte()
        let address2 = this.fetchNextByte()

        let finalAddress = this.getLittleEndianWordAddress(address1, address2) // Address Rolls over if bigger than 8 bit limit 
        
        // Add X Register and checks if page boundary is crossed
        let finalAddressX = finalAddress + this.getRegister('X')
        if (finalAddressX - finalAddress >= 255 || alwaysUseAdditionalTick) this.completedTicks++

        // Reads Value at Address
        return finalAddressX
    }

    private addrModeABSY(alwaysUseAdditionalTick: boolean = false){
        // Reads Address at Next Byte
        let address1 = this.fetchNextByte()
        let address2 = this.fetchNextByte()

        let finalAddress = this.getLittleEndianWordAddress(address1, address2) // Address Rolls over if bigger than 8 bit limit 
        
        // Add X Register and checks if page boundary is crossed
        let finalAddressY = finalAddress + this.getRegister('Y')
        if (finalAddressY - finalAddress >= 255 || alwaysUseAdditionalTick) this.completedTicks++

        // Reads Value at Address
        return finalAddressY
    }

    private addrModeINDX(){
        // Reads Next Byte
        let ZPAddress = this.fetchNextByte() // Explicit Value
        ZPAddress += this.getRegister('X')
        this.completedTicks++
        
        if (ZPAddress > 255) ZPAddress -= 256 // ZP Address Wraps Around

        let address1 = this.readByte(ZPAddress)
        let address2 = this.readByte(ZPAddress + 1)

        let finalAddress = this.getLittleEndianWordAddress(address1, address2)

        this.completedTicks++

        return finalAddress
    }


    private addrModeINDY(alwaysUseAdditionalTick:boolean = false){
        let ZPAddress = this.fetchNextByte()
        let address1 = this.readByte(ZPAddress)
        let address2 = this.readByte(ZPAddress + 1)
        let finalAddress = this.getLittleEndianWordAddress(address1, address2)
        let finalAddressY = finalAddress + this.getRegister('Y')
        this.completedTicks++

        // Checks if page boundary is crosssed
        if (finalAddressY - finalAddress >= 255 || alwaysUseAdditionalTick) this.completedTicks++

        return finalAddressY
    }


    private addrModeREL(){
        let signedOffset = this.fetchNextByte()
        let offsetValue = calculateSigned8BitBinaryValue(signedOffset)
        console.log(offsetValue)
        return this.PC + offsetValue
    }
    //#endregion

    //#region Flag Setting
    private setFlagsForValue(value: number){
        if (value === 0) this.setFlag('Z', true)
        if (toBin(value)[0] === '1') this.setFlag('N', true)
    }

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
    //#endregion

    //#region Bitwise Logic
    private bitwiseAND(value1:number, value2:number){
        let bin1 = toBin(value1)
        let bin2 = toBin(value2)
        let finalBin = ''

        for (let i = 0; i < bin1.length; i++){
            // console.log(`${bin1[]}`)
            
            if (bin1[i] === '1' && bin2[i] === '1'){
                finalBin += '1'
            } else {
                finalBin += '0'
            }

        }

        return fromBin(finalBin)
    }

    private bitwiseEOR(value1:number, value2:number){
        let bin1 = toBin(value1)
        let bin2 = toBin(value2)
        let finalBin = ''

        for (let i = 0; i < bin1.length; i++){
            // console.log(`${bin1[]}`)
            
            if ((bin1[i] === '0' && bin2[i] === '1') || (bin1[i] === '1' && bin2[i] === '0')){
                finalBin += '1'
            } else {
                finalBin += '0'
            }

        }

        return fromBin(finalBin)
    }

    private bitwiseORA(value1:number, value2:number){
        let bin1 = toBin(value1)
        let bin2 = toBin(value2)
        let finalBin = ''

        for (let i = 0; i < bin1.length; i++){
            // console.log(`${bin1[]}`)
            
            if (bin1[i] === '1' || bin2[i] === '1'){
                finalBin += '1'
            } else {
                finalBin += '0'
            }

        }

        return fromBin(finalBin)
    }

    private bitwiseBIT(address: number){
        let memoryValue = this.readByte(address)
        let ANDed = this.bitwiseAND(this.getRegister('A'), memoryValue)
        if (ANDed === 0) this.setFlag('Z', true)
        this.setFlag('N', toBin(memoryValue)[0] === '1' ? true : false)
        this.setFlag('V', toBin(memoryValue)[1] === '1' ? true : false)
    
    }
    //#endregion


    //#region LittleEndian Calclulations
    private getLittleEndianWordAddress(address1:number, address2:number){
        let address1Bin = toBin(address1)
        let address2Bin = toBin(address2)
        let finalAddressBin = address2Bin + address1Bin
        return fromBin(finalAddressBin)
    }

    private getAddressFromLittleEndian(LoByte:number, HiByte:number){
        let fullAddress = `${toBin(HiByte)}${toBin(LoByte)}`
        let address = fromBin(fullAddress)
        return address
    }
    //#endregion


    private branchInstruction(condition: boolean){
        let BEQ_address = this.addrModeREL()
        if (this.getFlag('Z')){
            this.setPC(BEQ_address)
            this.completedTicks++
            // TODO: Should consume aditional tick if in different page
        }
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
        let instructionName = getInstructionFromOpcode(instruction)
        console.groupCollapsed(`Cycle: ${this.completedCycles} \nInstruction: ${toHex(instruction)} (${instructionName}  -  ${getAddressingModeFromOpcode(instruction, instructionName)}) \nPC: ${this.getPC()}`)
        console.log(`Addressing Mode: `)
        console.group("―――――――――――――――――< Logs >―――――――――――――――――")
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
                let LDA_ZP_address = this.addrModeZP()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_ZP_address))
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.ZPX:
                let LDA_ZPX_address = this.addrModeZPX()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_ZPX_address))
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.ABS:                
                let LDA_ABS_address = this.addrModeABS()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_ABS_address))
                
                // Sets falgs
                this.LDA_setFlags()
                break;
        
            case INS.LDA.ABSX:
                let LDA_ABSX_address = this.addrModeABSX()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_ABSX_address))
                
                // Sets falgs
                this.LDA_setFlags()
                break;
        
            case INS.LDA.ABSY:
                let LDA_ABSY_address = this.addrModeABSY()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_ABSY_address))
                
                // Sets falgs
                this.LDA_setFlags()
                break;
            
            case INS.LDA.INDX:
                let LDA_INDX_address = this.addrModeINDX()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_INDX_address))
                // Sets Flags
                this.LDA_setFlags()        
                break;

            case INS.LDA.INDY:
                let LDA_INDY_address = this.addrModeINDY()
                // Loads Next Bytes Value to A
                this.setRegister('A', this.readByte(LDA_INDY_address))

                this.LDA_setFlags()
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
                // Loads Next Bytes Value to X
                let LDX_ZP_address = this.addrModeZP()
                this.setRegister('X', this.readByte(LDX_ZP_address))
                
                // Sets falgs
                this.LDX_setFlags()
            break;
                
            case INS.LDX.ZPY:
                
                let LDX_ZPY_address = this.addrModeZPY()
                this.setRegister('X', this.readByte(LDX_ZPY_address))
                
                // Sets falgs
                this.LDX_setFlags()
                break;
            
            case INS.LDX.ABS:
                let LDX_ABS_address = this.addrModeABS()
                this.setRegister('X', this.readByte(LDX_ABS_address))
                
                // Sets flags
                this.LDX_setFlags()
                break;
        
            case INS.LDX.ABSY:
                // Reads Value at Address
                let LDX_ABSY_value = this.readByte(this.addrModeABSY())
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
                // Reads Value at Address
                let LDY_ZP_value = this.readByte(this.addrModeZP())

                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ZP_value)
                
                // Sets falgs
                this.LDY_setFlags()
            break;
                
            case INS.LDY.ZPX:
                // Reads Value at Address
                let LDY_ZPX_value = this.readByte(this.addrModeZPX())
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ZPX_value)
                
                // Sets falgs
                this.LDY_setFlags()
                break;
            
            case INS.LDY.ABS:
                // Reads Value at Address
                let LDY_ABS_value = this.readByte(this.addrModeABS())
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ABS_value)
                
                // Sets flags
                this.LDY_setFlags()
                break;
        
            case INS.LDY.ABSX:
                // Reads Value at Address
                let LDY_ABSX_value = this.readByte(this.addrModeABSX())
                // Loads Next Bytes Value to A
                this.setRegister('Y', LDY_ABSX_value)
                
                // Sets falgs
                this.LDY_setFlags()
                break;    
            //#endregion



            //#region STA
            case INS.STA.ZP:
                let STA_ZP_address = this.addrModeZP()
                this.writeByte(STA_ZP_address, this.getRegister('A'))
                break;
           
            case INS.STA.ZPX:
                let STA_ZPX_address = this.addrModeZPX()
                this.writeByte(STA_ZPX_address, this.getRegister('A'))
                break;

            case INS.STA.ABS:
                let STA_ABS_address = this.addrModeABS()
                this.writeByte(STA_ABS_address, this.getRegister('A'))
                break;

            case INS.STA.ABSX:
                let STA_ABSX_address = this.addrModeABSX(true)
                this.writeByte(STA_ABSX_address, this.getRegister('A'))
                break;

            case INS.STA.ABSY:
                let STA_ABSY_address = this.addrModeABSY(true)
                this.writeByte(STA_ABSY_address, this.getRegister('A'))
                break;

            case INS.STA.INDX:
                let STA_INDX_address = this.addrModeINDX()
                this.writeByte(STA_INDX_address, this.getRegister('A'))
                break;
            
            case INS.STA.INDY:
                let STA_INDY_address = this.addrModeINDY(true)
                this.writeByte(STA_INDY_address, this.getRegister('A'))
                break;
           
            //#endregion

            //#region STX
            case INS.STX.ZP:
                let STX_ZP_address = this.addrModeZP()
                this.writeByte(STX_ZP_address, this.getRegister('X'))
                break;

            case INS.STX.ZPY:
                let STX_ZPY_address = this.addrModeZPY()
                this.writeByte(STX_ZPY_address, this.getRegister('X'))
                break;

            case INS.STX.ABS:
                let STX_ABS_address = this.addrModeABS()
                this.writeByte(STX_ABS_address, this.getRegister('X'))
                break;
            //#endregion

            //#region STY
            case INS.STY.ZP:
                let STY_ZP_address = this.addrModeZP()
                this.writeByte(STY_ZP_address, this.getRegister('Y'))
                break;

            case INS.STY.ZPX:
                let STY_ZPX_address = this.addrModeZPX()
                this.writeByte(STY_ZPX_address, this.getRegister('Y'))
                break;

            case INS.STY.ABS:
                let STY_ABS_address = this.addrModeABS()
                this.writeByte(STY_ABS_address, this.getRegister('Y'))
                break;
            //#endregion



            //#region JMP:
            case INS.JMP.ABS:
                let JMP_ABS_address = this.addrModeABS()
                this.setPC(JMP_ABS_address)
                break;

            case INS.JMP.IDR:
                let JMP_IDR_firstAddress = this.addrModeABS()
                let JMP_IDR_LoByte = this.readByte(JMP_IDR_firstAddress)
                let JMP_IDR_HiByte = this.readByte(JMP_IDR_firstAddress + 1)
                let finalAddress = this.getAddressFromLittleEndian(JMP_IDR_LoByte, JMP_IDR_HiByte)
                this.setPC(finalAddress)
                break;
            //#endregion

            //#region JSR
            case INS.JSR.ABS:
                let JSR_ABS_nextAdress = this.addrModeABS()
                let JSR_ABS_curAddress = this.getPC()
                let JSR_ABS_curAddress_bin = toBin(JSR_ABS_curAddress, true, 16)
                let JSR_ABS_HiByte = JSR_ABS_curAddress_bin.slice(0,8)
                let JSR_ABS_LoByte = JSR_ABS_curAddress_bin.slice(8)
                this.pushStack(fromBin(JSR_ABS_HiByte))
                this.pushStack(fromBin(JSR_ABS_LoByte))
                this.setPC(JSR_ABS_nextAdress)
                this.completedTicks++
                break;
            //#endregion

            //#region RST
            case INS.RTS:
                let RTS_LoByte = this.popStack()
                let RTS_HiByte = this.popStack()
                let RTS_address = this.getAddressFromLittleEndian(RTS_LoByte, RTS_HiByte)
                this.setPC(RTS_address)
                this.completedTicks++
                break;
            //#endregion
            


            //#region TSX
            case INS.TSX:
                this.setRegister('X', this.getSP())
                this.completedTicks++
                this.LDX_setFlags()
                break;
            //#endregion

            //#region TXS
            case INS.TXS:
                this.setSP(this.getRegister('X'))
                this.completedTicks++
                break;
            //#endregion
            
            //#region PHA
            case INS.PHA:
                this.pushStack(this.getRegister('A'))
                this.completedTicks++
                break;
            //#endregion
            
            //#region PHA
            case INS.PHP:
                let PHP_flagByte = this.getFlagByte()
                this.pushStack(fromBin(PHP_flagByte))
                this.completedTicks++
                break;
            //#endregion

            //#region PLA:
            case INS.PLA:
                this.setRegister('A',this.popStack())
                this.completedTicks += 2
                this.LDA_setFlags()
                break;
            //#endregion

            //#region PLP
            case INS.PLP:
                this.setFlagByte(this.popStack())
                break;
            //#endregion



            //#region AND
            case INS.AND.IMD:
                let AND_IMD_newVal = this.bitwiseAND(this.getRegister('A'), this.fetchNextByte())
                this.setRegister('A', AND_IMD_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.ZP:
                let AND_ZP_address = this.addrModeZP()
                let AND_ZP_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_ZP_address))
                this.setRegister('A', AND_ZP_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.ZPX:
                let AND_ZPX_address = this.addrModeZPX()
                let AND_ZPX_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_ZPX_address))
                this.setRegister('A', AND_ZPX_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.ABS:
                let AND_ABS_address = this.addrModeABS()
                let AND_ABS_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_ABS_address))
                this.setRegister('A', AND_ABS_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.ABSX:
                let AND_ABSX_address = this.addrModeABSX()
                let AND_ABSX_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_ABSX_address))
                this.setRegister('A', AND_ABSX_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.ABSY:
                let AND_ABSY_address = this.addrModeABSY()
                let AND_ABSY_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_ABSY_address))
                this.setRegister('A', AND_ABSY_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.INDX:
                let AND_INDX_address = this.addrModeINDX()
                let AND_INDX_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_INDX_address))
                this.setRegister('A', AND_INDX_newVal)
                this.LDA_setFlags()
                break;

            case INS.AND.INDY:
                let AND_INDY_address = this.addrModeINDY()
                let AND_INDY_newVal = this.bitwiseAND(this.getRegister('A'), this.readByte(AND_INDY_address))
                this.setRegister('A', AND_INDY_newVal)
                this.LDA_setFlags()
                break;

            
            //#endregion

            //#region EOR
            case INS.EOR.IMD:
                let EOR_IMD_newVal = this.bitwiseEOR(this.getRegister('A'), this.fetchNextByte())
                this.setRegister('A', EOR_IMD_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.ZP:
                let EOR_ZP_address = this.addrModeZP()
                let EOR_ZP_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_ZP_address))
                this.setRegister('A', EOR_ZP_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.ZPX:
                let EOR_ZPX_address = this.addrModeZPX()
                let EOR_ZPX_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_ZPX_address))
                this.setRegister('A', EOR_ZPX_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.ABS:
                let EOR_ABS_address = this.addrModeABS()
                let EOR_ABS_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_ABS_address))
                this.setRegister('A', EOR_ABS_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.ABSX:
                let EOR_ABSX_address = this.addrModeABSX()
                let EOR_ABSX_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_ABSX_address))
                this.setRegister('A', EOR_ABSX_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.ABSY:
                let EOR_ABSY_address = this.addrModeABSY()
                let EOR_ABSY_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_ABSY_address))
                this.setRegister('A', EOR_ABSY_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.INDX:
                let EOR_INDX_address = this.addrModeINDX()
                let EOR_INDX_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_INDX_address))
                this.setRegister('A', EOR_INDX_newVal)
                this.LDA_setFlags()
                break;

            case INS.EOR.INDY:
                let EOR_INDY_address = this.addrModeINDY()
                let EOR_INDY_newVal = this.bitwiseEOR(this.getRegister('A'), this.readByte(EOR_INDY_address))
                this.setRegister('A', EOR_INDY_newVal)
                this.LDA_setFlags()
                break;

            
            //#endregion

            //#region ORA
            case INS.ORA.IMD:
                let ORA_IMD_newVal = this.bitwiseORA(this.getRegister('A'), this.fetchNextByte())
                this.setRegister('A', ORA_IMD_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.ZP:
                let ORA_ZP_address = this.addrModeZP()
                let ORA_ZP_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_ZP_address))
                this.setRegister('A', ORA_ZP_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.ZPX:
                let ORA_ZPX_address = this.addrModeZPX()
                let ORA_ZPX_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_ZPX_address))
                this.setRegister('A', ORA_ZPX_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.ABS:
                let ORA_ABS_address = this.addrModeABS()
                let ORA_ABS_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_ABS_address))
                this.setRegister('A', ORA_ABS_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.ABSX:
                let ORA_ABSX_address = this.addrModeABSX()
                let ORA_ABSX_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_ABSX_address))
                this.setRegister('A', ORA_ABSX_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.ABSY:
                let ORA_ABSY_address = this.addrModeABSY()
                let ORA_ABSY_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_ABSY_address))
                this.setRegister('A', ORA_ABSY_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.INDX:
                let ORA_INDX_address = this.addrModeINDX()
                let ORA_INDX_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_INDX_address))
                this.setRegister('A', ORA_INDX_newVal)
                this.LDA_setFlags()
                break;

            case INS.ORA.INDY:
                let ORA_INDY_address = this.addrModeINDY()
                let ORA_INDY_newVal = this.bitwiseORA(this.getRegister('A'), this.readByte(ORA_INDY_address))
                this.setRegister('A', ORA_INDY_newVal)
                this.LDA_setFlags()
                break;
            //#endregion
            
            //#region BIT
            case INS.BIT.ZP:
                let BIT_ZP_address = this.addrModeZP()
                this.bitwiseBIT(BIT_ZP_address)
                break;

            case INS.BIT.ABS:
                let BIT_ABS_address = this.addrModeABS()
                this.bitwiseBIT(BIT_ABS_address)
                break;
            //#endregion



            //#region TAX
            case INS.TAX:
                this.setRegister('X', this.getRegister('A'))
                this.completedTicks++
                this.LDX_setFlags()
                break;
            //#endregion

            //#region TAY
            case INS.TAY:
                this.setRegister('Y', this.getRegister('A'))
                this.completedTicks++
                this.LDY_setFlags()
                break;
            //#endregion

            //#region TXA
            case INS.TXA:
                this.setRegister('A', this.getRegister('X'))
                this.completedTicks++
                this.LDA_setFlags()
                break;
            //#endregion

            //#region TYA
            case INS.TYA:
                this.setRegister('A', this.getRegister('Y'))
                this.completedTicks++
                this.LDA_setFlags()
                break;
            //#endregion



            //#region INC
            case INS.INC.ZP:
                let INC_ZP_address = this.addrModeZP()
                let INC_ZP_value = this.readByte(INC_ZP_address)
                let INC_ZP_newVal = INC_ZP_value + 1
                this.completedTicks++
                this.writeByte(INC_ZP_address, INC_ZP_newVal)
                this.setFlagsForValue(INC_ZP_newVal)
                break;

            case INS.INC.ZPX:
                let INC_ZPX_address = this.addrModeZPX()
                let INC_ZPX_value = this.readByte(INC_ZPX_address)
                let INC_ZPX_newVal = INC_ZPX_value + 1
                this.completedTicks++
                this.writeByte(INC_ZPX_address, INC_ZPX_newVal)
                this.setFlagsForValue(INC_ZPX_newVal)
                break;

            case INS.INC.ABS:
                let INC_ABS_address = this.addrModeABS()
                let INC_ABS_value = this.readByte(INC_ABS_address)
                let INC_ABS_newVal = INC_ABS_value + 1
                this.completedTicks++
                this.writeByte(INC_ABS_address, INC_ABS_newVal)
                this.setFlagsForValue(INC_ABS_newVal)
                break;

            case INS.INC.ABSX:
                let INC_ABSX_address = this.addrModeABSX(true)
                let INC_ABSX_value = this.readByte(INC_ABSX_address)
                let INC_ABSX_newVal = INC_ABSX_value + 1
                this.completedTicks++
                this.writeByte(INC_ABSX_address, INC_ABSX_newVal)
                this.setFlagsForValue(INC_ABSX_newVal)
                break;
            //#endregion

            //#region INX
            case INS.INX:
                this.setRegister('X', this.getRegister('X') + 1)
                this.completedTicks++
                this.LDX_setFlags()
                break;
            //#endregion

            //#region INY
            case INS.INY:
                this.setRegister('Y', this.getRegister('Y') + 1)
                this.completedTicks++
                this.LDY_setFlags()
                break;
            //#endregion

            //#region DEC
            case INS.DEC.ZP:
                let DEC_ZP_address = this.addrModeZP()
                let DEC_ZP_value = this.readByte(DEC_ZP_address)
                let DEC_ZP_newVal = DEC_ZP_value - 1
                this.completedTicks++
                this.writeByte(DEC_ZP_address, DEC_ZP_newVal)
                this.setFlagsForValue(DEC_ZP_newVal)
                break;

            case INS.DEC.ZPX:
                let DEC_ZPX_address = this.addrModeZPX()
                let DEC_ZPX_value = this.readByte(DEC_ZPX_address)
                let DEC_ZPX_newVal = DEC_ZPX_value - 1
                this.completedTicks++
                this.writeByte(DEC_ZPX_address, DEC_ZPX_newVal)
                this.setFlagsForValue(DEC_ZPX_newVal)
                break;

            case INS.DEC.ABS:
                let DEC_ABS_address = this.addrModeABS()
                let DEC_ABS_value = this.readByte(DEC_ABS_address)
                let DEC_ABS_newVal = DEC_ABS_value - 1
                this.completedTicks++
                this.writeByte(DEC_ABS_address, DEC_ABS_newVal)
                this.setFlagsForValue(DEC_ABS_newVal)
                break;

            case INS.DEC.ABSX:
                let DEC_ABSX_address = this.addrModeABSX(true)
                let DEC_ABSX_value = this.readByte(DEC_ABSX_address)
                let DEC_ABSX_newVal = DEC_ABSX_value - 1
                this.completedTicks++
                this.writeByte(DEC_ABSX_address, DEC_ABSX_newVal)
                this.setFlagsForValue(DEC_ABSX_newVal)
                break;
            //#endregion

            //#region DEX
            case INS.DEX:
                this.setRegister('X', this.getRegister('X') - 1)
                this.completedTicks++
                this.LDX_setFlags()
                break;
            //#endregion

            //#region DEY
            case INS.DEY:
                this.setRegister('Y', this.getRegister('Y') - 1)
                this.completedTicks++
                this.LDY_setFlags()
                break;
            //#endregion


            //#region BCC
            case INS.BCC.REL:
                this.branchInstruction(!this.getFlag('C'))                
                break;
            //#endregion

            //#region BCS
            case INS.BCS.REL:
                this.branchInstruction(this.getFlag('C'))                
                break;
            //#endregion

            //#region BEQ
            case INS.BEQ.REL:
                this.branchInstruction(this.getFlag('Z'))                
                break;
            //#endregion

            //#region BMI
            case INS.BMI.REL:
                this.branchInstruction(this.getFlag('N'))                
                break;
            //#endregion

            //#region BNE
            case INS.BNE.REL:
                this.branchInstruction(!this.getFlag('Z'))                
                break;
            //#endregion

            //#region BPL
            case INS.BPL.REL:
                this.branchInstruction(!this.getFlag('N'))                
                break;
            //#endregion

            //#region BVC
            case INS.BVC.REL:
                this.branchInstruction(!this.getFlag('V'))                
                break;
            //#endregion

            //#region BVS
            case INS.BMI.REL:
                this.branchInstruction(this.getFlag('V'))                
                break;
            //#endregion
            default:
                console.log(`Invalid Instruction ${toHex(instruction)}`)
                break;


        }

        this.logStatus()
        console.groupEnd()
        console.groupEnd()
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

    //#region DEBUG
    private logStatus(){
        console.groupEnd()
        console.group("―――――――――――――< System State >―――――――――――――")
        console.groupCollapsed("Registers:")
        console.log(`PC: ${this.PC}`)
        console.log(`SP: ${this.SP}`)
        let registers = Object.keys(this.registers)
        let regObj = this.registers as any
        for (let i = 0; i < registers.length; i++){
            let reg = registers[i] as any
            console.log(`${reg}: ${regObj[reg]}`)
        }
        console.groupEnd()

        console.groupCollapsed(`Flags: (${this.getFlagByte()})`)
        let flags = Object.keys(this.flags)
        let flagObj = this.flags as any
        for (let i = 0; i < flags.length; i++){
            let flag = flags[i] as any
            if (flag === 'Unused') continue
            console.log(`%c ${flag}: ${flagObj[flag]}`, `color:${flagObj[flag] ? 'green' : 'red'}`)
        }
        console.groupEnd()

        console.groupCollapsed("Stack:")
        console.log(this.partitionMap['65535'].readRegion(256,512))
        console.groupEnd()

        console.groupCollapsed("RAM:")
        console.log(this.partitionMap['65535'].data)
        console.groupEnd()
    }

    public loadProgram(instructionArray: string[] | number[], format: 'BIN' | 'HEX' | 'DEC'){
        instructionArray.forEach((value: any, index: number) => {
            switch (format){
                case 'DEC':
                    this.writeByte(index, value)
                    break;
                case 'HEX':
                    this.writeByte(index, fromHex(value))
                    break;
                case 'BIN':
                    this.writeByte(index, fromBin(value))
                    break;
            }
        })
    }
    //#endregion

}

export default CPU