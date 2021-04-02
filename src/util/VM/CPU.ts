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

    private PC: number
    private SP: number

    private registers: Registers
    private flags: Flags

    private RAM: Memory

    constructor(){
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

        this.RAM = new Memory(this.bitSize, 2**this.addressSize)
        
        
        
        this.reset()
    }

    reset(){
        this.PC = 65532
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

        this.RAM = new Memory(this.bitSize, 2**this.addressSize)
    }
}

export default CPU