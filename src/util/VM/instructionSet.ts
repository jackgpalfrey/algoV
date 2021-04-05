import { fromHex } from './helpers'

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
    }
}

export default InstructionSet

//TODO: JSR - 1st Video
