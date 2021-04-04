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
    RTS: fromHex('60')  // Return from Subroutine

}

export default InstructionSet

//TODO: JSR - 1st Video
