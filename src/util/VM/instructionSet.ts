import { fromHex } from './helpers'

const InstructionSet = {
    LDA: {
        IMD: fromHex('A9'), // (Immediate)
        ZP: fromHex('A5'), //  (Zero Page)
        ZPX: fromHex('B5'), //  (Zero Page, X)
        ABS: fromHex('AD'), //  (Absolute)
        ABSX: fromHex('BD'), //  (Absolute,X)
        ABSY: fromHex('B9'), //  (Absolute,Y)
        INDX: fromHex('A1'), //  (Indirect, X)
        INDY: fromHex('B1'), //  (Indirect, Y)
    }, 
    LDX: {
        IMD: fromHex('A2'), // (Immediate)
        ZP: fromHex('A6'), //  (Zero Page)
        ZPY: fromHex('B6'), //  (Zero Page, Y)
        ABS: fromHex('AE'), //  (Absolute)
        ABSY: fromHex('BE'), //  (Absolute,Y)
    }, 
    LDY: {
        IMD: fromHex('A0'), // (Immediate)
        ZP: fromHex('A4'), //  (Zero Page)
        ZPX: fromHex('B4'), //  (Zero Page, X)
        ABS: fromHex('AC'), //  (Absolute)
        ABSX: fromHex('BC'), //  (Absolute,X)
    }, 

    STA: {
        ZP: fromHex('85'), //  (Zero Page)
        ZPX: fromHex('95'), //  (Zero Page, X)
        ABS: fromHex('8D'), //  (Absolute)
        ABSX: fromHex('9D'), //  (Absolute,X)
        ABSY: fromHex('99'), //  (Absolute,Y)
        INDX: fromHex('81'), //  (Indirect, X)
        INDY: fromHex('91'), //  (Indirect, Y)
    }, 
    STX: {
        ZP: fromHex('86'), //  (Zero Page)
        ZPY: fromHex('96'), //  (Zero Page, Y)
        ABS: fromHex('8E'), //  (Absolute)
    }, 
    STY: {
        ZP: fromHex('84'), //  (Zero Page)
        ZPX: fromHex('94'), //  (Zero Page, X)
        ABS: fromHex('8C'), //  (Absolute)
    }, 

}

export default InstructionSet

//TODO: JSR - 1st Video