import { calculateSigned8BitBinaryValue, fromHex, toBin } from './helpers'


const InstructionSet = {
    LDA: {  // Load Accumulator
        IMD: fromHex('A9'), // (Immediate)
        ZP: fromHex('A5'), //  (Zero Page)
        ZPX: fromHex('B5'), //  (Zero Page, X)
        ABS: fromHex('AD'), //  (Absolute)
        ABSX: fromHex('BD'), //  (Absolute,X)
        ABSY: fromHex('B9'), //  (Absolute,Y)
        INDX: fromHex('A1'), //  (Indirect, X)
        INDY: fromHex('B1'), //  (Indirect, Y)
    }, 
    LDX: {  // Load X Register
        IMD: fromHex('A2'), // (Immediate)
        ZP: fromHex('A6'), //  (Zero Page)
        ZPY: fromHex('B6'), //  (Zero Page, Y)
        ABS: fromHex('AE'), //  (Absolute)
        ABSY: fromHex('BE'), //  (Absolute,Y)
    }, 
    LDY: {  // Load Y Register
        IMD: fromHex('A0'), // (Immediate)
        ZP: fromHex('A4'), //  (Zero Page)
        ZPX: fromHex('B4'), //  (Zero Page, X)
        ABS: fromHex('AC'), //  (Absolute)
        ABSX: fromHex('BC'), //  (Absolute,X)
    }, 


    STA: {  // Store Accumulator
        ZP: fromHex('85'), //  (Zero Page)
        ZPX: fromHex('95'), //  (Zero Page, X)
        ABS: fromHex('8D'), //  (Absolute)
        ABSX: fromHex('9D'), //  (Absolute,X)
        ABSY: fromHex('99'), //  (Absolute,Y)
        INDX: fromHex('81'), //  (Indirect, X)
        INDY: fromHex('91'), //  (Indirect, Y)
    }, 
    STX: {  // Store X Register
        ZP: fromHex('86'), //  (Zero Page)
        ZPY: fromHex('96'), //  (Zero Page, Y)
        ABS: fromHex('8E'), //  (Absolute)
    }, 
    STY: {  // Store Y Register
        ZP: fromHex('84'), //  (Zero Page)
        ZPX: fromHex('94'), //  (Zero Page, X)
        ABS: fromHex('8C'), //  (Absolute)
    }, 


    JMP:{   // Jump
        ABS: fromHex('4C'), // (Absolute)
        IDR: fromHex('6C'), // (Indirect),
    },
    JSR:{   // Jump To Subroutine
        ABS: fromHex('20')
    },
    RTS: fromHex('60'),  // Return from Subroutine


    TSX: fromHex('BA'), // Transfer Stack Pointer To X 
    TXS: fromHex('9A'), // Transfer X To Stack Pointer
    PHA: fromHex('48'), // Push Accumulator To Stack
    PHP: fromHex('08'), // Push Flags Byte To Stack
    PLA: fromHex('68'), // Pull Accumulator From Stack
    PLP: fromHex('28'), // Pull Flags From Stack


    AND: { // Bitwise AND
        IMD: fromHex('29'), // (Immediate)
        ZP: fromHex('25'), //  (Zero Page)
        ZPX: fromHex('35'), //  (Zero Page, X)
        ABS: fromHex('2D'), //  (Absolute)
        ABSX: fromHex('3D'), //  (Absolute,X)
        ABSY: fromHex('39'), //  (Absolute,Y)
        INDX: fromHex('21'), //  (Indirect, X)
        INDY: fromHex('31'), //  (Indirect, Y)
    },
    EOR: {  // Bitwise Exclusive OR
        IMD: fromHex('49'), // (Immediate)
        ZP: fromHex('45'), //  (Zero Page)
        ZPX: fromHex('55'), //  (Zero Page, X)
        ABS: fromHex('4D'), //  (Absolute)
        ABSX: fromHex('5D'), //  (Absolute,X)
        ABSY: fromHex('59'), //  (Absolute,Y)
        INDX: fromHex('41'), //  (Indirect, X)
        INDY: fromHex('51'), //  (Indirect, Y)
    },
    ORA: {  // Bitwise Inclusive OR
        IMD: fromHex('09'), // (Immediate)
        ZP: fromHex('05'), //  (Zero Page)
        ZPX: fromHex('15'), //  (Zero Page, X)
        ABS: fromHex('0D'), //  (Absolute)
        ABSX: fromHex('1D'), //  (Absolute,X)
        ABSY: fromHex('19'), //  (Absolute,Y)
        INDX: fromHex('01'), //  (Indirect, X)
        INDY: fromHex('11'), //  (Indirect, Y)
    },
    BIT: {  // Bitwise BIT
        ZP: fromHex('24'),
        ABS: fromHex('2C')
    },


    TAX: fromHex('AA'), // Transfer Accmulator to X
    TAY: fromHex('A8'), // Transfer Accumulator to Y
    TXA: fromHex('8A'), // Transfer X to Accumulator
    TYA: fromHex('98'),  // Transfer Y to Accumulator


    INC: {  // Increment Memory
        ZP: fromHex('E6'), //  (Zero Page)
        ZPX: fromHex('F6'), //  (Zero Page, X)
        ABS: fromHex('EE'), //  (Absolute)
        ABSX: fromHex('FE'), //  (Absolute,X)
    },
    INX: fromHex('E8'),  // Increment X Register
    INY: fromHex('C8'),  // Increment Y Register
    DEC: {  // Decrement Memory
        ZP: fromHex('C6'), //  (Zero Page)
        ZPX: fromHex('D6'), //  (Zero Page, X)
        ABS: fromHex('CE'), //  (Absolute)
        ABSX: fromHex('DE'), //  (Absolute,X)
    },
    DEX: fromHex('CA'),  // Decrement X Register
    DEY: fromHex('88'),  // Decrement Y Register


    BCC: {  // Branch if carry flag clear
        REL: fromHex('90')
    },
    BCS: {  // Branch if carry flag set
        REL: fromHex('B0')
    },
    BEQ: {  // Branch if zero flag set
        REL: fromHex('F0')
    },
    BMI: {  // Branch if negative flag set
        REL: fromHex('30')
    },
    BNE: {  // Branch if zero flag clear
        REL: fromHex('D0')
    },
    BPL: {  // Branch if negative flag clear
        REL: fromHex('10')
    },
    BVC: {  // Branch if overflow flag clear
        REL: fromHex('50')
    },
    BVS: {  // Branch if overflow flag set
        REL: fromHex('70')
    },

    CLC: fromHex('18'), // Clear Carry Flag
    CLD: fromHex('D8'), // Clear Decimal Mode Flag
    CLI: fromHex('58'), // Clear Interupt Disable Flag
    CLV: fromHex('B8'), // Clear Overflow Flag
    SEC: fromHex('38'), // Set Carry Flag
    SED: fromHex('F8'), // Set Decimal Mode Flag
    SEI: fromHex('78'), // Set Interupt Disable Flag


    ADC: {
        IMD: fromHex('69'), // (Immediate)
        ZP: fromHex('65'), //  (Zero Page)
        ZPX: fromHex('75'), //  (Zero Page, X)
        ABS: fromHex('6D'), //  (Absolute)
        ABSX: fromHex('7D'), //  (Absolute,X)
        ABSY: fromHex('79'), //  (Absolute,Y)
        INDX: fromHex('61'), //  (Indirect, X)
        INDY: fromHex('71'), //  (Indirect, Y)
    },
    SBC: {
        IMD: fromHex('E9'), // (Immediate)
        ZP: fromHex('E5'), //  (Zero Page)
        ZPX: fromHex('F5'), //  (Zero Page, X)
        ABS: fromHex('ED'), //  (Absolute)
        ABSX: fromHex('FD'), //  (Absolute,X)
        ABSY: fromHex('F9'), //  (Absolute,Y)
        INDX: fromHex('E1'), //  (Indirect, X)
        INDY: fromHex('F1'), //  (Indirect, Y)
    },
    CMP: {
        IMD: fromHex('C9'), // (Immediate)
        ZP: fromHex('C5'), //  (Zero Page)
        ZPX: fromHex('D5'), //  (Zero Page, X)
        ABS: fromHex('CD'), //  (Absolute)
        ABSX: fromHex('DD'), //  (Absolute,X)
        ABSY: fromHex('D9'), //  (Absolute,Y)
        INDX: fromHex('C1'), //  (Indirect, X)
        INDY: fromHex('D1'), //  (Indirect, Y)
    },
    CPX:{
        IMD: fromHex('E0'),
        ZP: fromHex('E4'),
        ABS: fromHex('EC')
    },
    CPY:{
        IMD: fromHex('C0'),
        ZP: fromHex('C4'),
        ABS: fromHex('CC')
    },


    ASL: {
        ACC: fromHex('0A'),  // (Accumulator)
        ZP: fromHex('06'),   // (Zero Page)
        ZPX: fromHex('16'),  // (Zero Page, X)
        ABS: fromHex('0E'),  // (Absolute)
        ABSX: fromHex('1E'), // (Absolute, X)
    },
    LSR: {
        ACC: fromHex('4A'),  // (Accumulator)
        ZP: fromHex('46'),   // (Zero Page)
        ZPX: fromHex('56'),  // (Zero Page, X)
        ABS: fromHex('4E'),  // (Absolute)
        ABSX: fromHex('5E'), // (Absolute, X)
    },
    ROL: {
        ACC: fromHex('2A'),  // (Accumulator)
        ZP: fromHex('26'),   // (Zero Page)
        ZPX: fromHex('36'),  // (Zero Page, X)
        ABS: fromHex('2E'),  // (Absolute)
        ABSX: fromHex('3E'), // (Absolute, X)
    },
    ROR: {
        ACC: fromHex('6A'),  // (Accumulator)
        ZP: fromHex('66'),   // (Zero Page)
        ZPX: fromHex('76'),  // (Zero Page, X)
        ABS: fromHex('6E'),  // (Absolute)
        ABSX: fromHex('7E'), // (Absolute, X)
    },

    BRK: fromHex('00'), // Force Interupt
    NOP: fromHex('EA'), // No Operation
    RTI: fromHex('40') // Return from interupt
}


export default InstructionSet

//TODO: JSR - 1st Video



