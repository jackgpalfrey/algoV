import { fromHex } from './helpers'

const InstructionSet = {
    LDA_IMD: fromHex('A9'), // Load Accumulator (Immediate)
    LDA_ZP: fromHex('A5'), // Load Accumulator (Zero Page)
    LDA_ZPX: fromHex('B5'), // Load Accumulator (Zero Page, X)
    LDA_ABS: fromHex('AD'), // Load Accumulator (Absolute)
    LDA_ABSX: fromHex('BD'), // Load Accumulator (Absolute,X)
    LDA_ABSY: fromHex('B9'), // Load Accumulator (Absolute,Y)
    LDA_INDX: fromHex('A1'), // Load Accumulator (Indirect, X)
    LDA_INDY: fromHex('B1'), // Load Accumulator (Indirect, Y)
}

export default InstructionSet