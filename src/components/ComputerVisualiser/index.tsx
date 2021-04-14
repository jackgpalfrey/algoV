import React, { useEffect, useState } from 'react'

import { toBin, toHex, fromBin, fromHex, calculateSigned8BitBinaryValue, bitwiseNegate, byteAdd, getInstructionFromOpcode, getAddressingModeFromOpcode} from '../../util/VM/helpers'
import VM from '../../util/VM/VM'
import INS from '../../util/VM/instructionSet'
import EventEmitter from '../../util/VM/EventEmitter'
import './style.css'
import AssemblyAnalysisCard from './AssemblyAnalysisCard'

// const CPU = new VM({cycleLimit: Infinity, cycleSpeed:1})
// const Computer = new VM()
// let listener = new EventEmitter()


const ComputerVisualiser: React.FC = () => {
    const [Computer, setComputer] = useState(new VM())
    const [memPage, setMemPage] = useState(0)
    const [memArray, setMemArray] = useState([1])
    const [memFormat, setMemFormat] = useState('DEC')

    const [PC, setPC] = useState(0)
    const [SP, setSP] = useState(255)
    const [A, setA] = useState(0)
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)

    const [flags, setFlags] = useState({
        C: false, // Carry Flag
        Z: false, // Zero Flag
        I: false, // Interupt Disable Flag
        D: false, // Decimal Mode Flag
        B: false, // Break Flag
        Unused: true, // Unused Flag
        V: false, // Overflow Flag
        N: false // Negative Flag
    })

    useEffect(() => {
        // Computer.start()

        Computer.memoryMap.writeByte(65534, 11)
        Computer.memoryMap.writeByte(65535, 10)

        Computer.Processor.loadProgram([
            'A9','00',
            '18',
            '69','08',
            'C9','18',
            'D0','FA',
            'A2','14'
        ], 'HEX')


        // let startAddress = 256 * memPage
        // let endAddress = (256 * memPage) + 256
        // setMemArray(Computer.memoryMap.readRegion(startAddress, endAddress))

        Computer.Processor.on('setPC', (data) => {
            console.clear()
            setPC(data.PC)
        })

        Computer.Processor.on('setSP', (data) => {
            setSP(data.SP)
        })

        Computer.Processor.on('setReg', (data) => {
            switch (data.register){
                case 'A':
                    setA(data.value)
                    break;
                case 'X':
                    setX(data.value)
                    break;
                case 'Y':
                    setY(data.value)
                    break;
            }
        })

        Computer.Processor.on('setFlag', (data) => {
            setFlags(data.flags)
        })



        Computer.memoryMap.on('WRITE', ({ address }) => {
            let startAddress = 256 * memPage
            let endAddress = (256 * memPage) + 256
            if (address >= startAddress && address < endAddress){
                setMemArray(Computer.memoryMap.readRegion(startAddress, endAddress))
            }
            
        })

        openPage()
        Computer.start()
    }, [])
    // Sets Interupt Handler
    
    function openPage(page = memPage){
        let startAddress = 256 * page
        let endAddress = (256 * page) + 256
        setMemArray(Computer.memoryMap.readRegion(startAddress, endAddress))
    }

    function visualiseMemory(){
        let stuff = memArray.map((value, index) => {
            let isCurrentPC = ((256 * memPage) + index) === PC
            let instructionName = getInstructionFromOpcode(value)
            let addressingModeName = getAddressingModeFromOpcode(value, instructionName)
            let extraDetailsString = ``
            if (instructionName !== 'UNK'){
                extraDetailsString = ` (${instructionName} - ${addressingModeName})`
            }

            if (memFormat === 'BIN'){
                let binRep = toBin(value)
                let binRep1 = binRep.slice(0,4)
                let binRep2 = binRep.slice(4)
                return <div className={`memoryLocation memFormat-${memFormat} ${isCurrentPC? 'activePC' : null}`} title={`Address: ${index + (256 * memPage)} (${toHex(index + (256 * memPage), true)})`}>
                    <p>{binRep1}</p>
                    <p>{binRep2}</p>
                </div>

            } else {
                return <div className={`memoryLocation memFormat-${memFormat} ${isCurrentPC? 'activePC' : null}`} title={`Address: ${index + (256 * memPage)} (${toHex(index + (256 * memPage), true)}) ${extraDetailsString}`}>{getFormattedValue(value)}</div>
            }
        })
        return stuff
    }

    function drawScreen(){
        let grid = []
        for (let i = 0; i < 16; i++){
            let axis = []
            for (let j = 0; j < 16; j++){
                axis.push(<div className='screenNode'>{String.fromCharCode(43)}</div>)
            }
            grid.push(<div className='screenRow'>{axis}</div>)
        }

        return grid
    }

    function getScreen(){
        let screenLowerBound = 65025
        let screenHigherBound = 65025 + 255

    }

    function getFormattedValue(value: number){
        switch (memFormat){
            case 'DEC':
                return value
                break;
            case 'HEX':
                return toHex(value, true).replace('0x','')
                break;
            case 'BIN':
                return toBin(value, true, 8)
                break;
        }
    }

    function setPage(value:number){
        if (typeof value !== 'number' || value === NaN|| value < 0 || value > 255) return
        setMemPage(value)
        openPage(value)
    }
    
    
    return (
        <div className='compute_container'>
            <div className='compute-inner-container'>
                <AssemblyAnalysisCard memory={memArray}></AssemblyAnalysisCard>
            <div className='registryBox'>
                <h3 className="registerTitle">Registers</h3>     
                <br />
                <p><span className='registerName'>Program Counter:</span> {PC}</p>
                <p><span className='registerName'>Stack Pointer:</span> {SP}</p>
                <br />
                <p><span className='registerName'>Accumulator:</span> {A}</p>
                <p><span className='registerName'>X Register:</span> {X}</p>
                <p><span className='registerName'>Y Register:</span> {Y}</p>
                <h3 className="registerTitle">Flags</h3>  
                <br />
                <p><span className='registerName'>Carry Flag:</span> {flags.C ? '1' : '0'}</p>
                <p><span className='registerName'>Zero Flag:</span> {flags.Z ? '1' : '0'}</p>
                <p><span className='registerName'>Interupt Disable Flag:</span> {flags.I ? '1' : '0'}</p>
                <p><span className='registerName'>Decimal Mode Flag:</span> {flags.D ? '1' : '0'}</p>
                <p><span className='registerName'>Break Flag:</span> {flags.B ? '1' : '0'}</p>
                <p><span className='registerName'>Overflow Flag:</span> {flags.V ? '1' : '0'}</p>
                <p><span className='registerName'>Negative Flag:</span> {flags.N ? '1' : '0'}</p>          
            </div>

            <div className='screen'>
                {drawScreen()}
            </div>
        





            <div className="memoryBox">
                <div className='memoryBoxTitle'>
                    <h3>Memory <br /> Viewer</h3>
                    <div className='memFormatControls'>
                        <h4>Format</h4>
                        <div>
                        <button onClick={() => {setMemFormat('DEC')}} className={`controls ${memFormat === 'DEC' ? 'curFormat' : ''}`}>Decimal</button>
                        <button onClick={() => {setMemFormat('HEX')}} className={`controls ${memFormat === 'HEX' ? 'curFormat' : ''}`}>Hex</button>
                        <button onClick={() => {setMemFormat('BIN')}} className={`controls ${memFormat === 'BIN' ? 'curFormat' : ''}`}>Binary</button>
                        </div>
                    </div>
                    <div className='memPageControls'>
                        <h4>Page: </h4>
                        <div>
                        <button onClick={() => {
                            setPage(memPage - 1)
                        }}>{'<'}</button>
                        <input value={memPage} onChange={(e) => {
                            let val = e.target.value
                            if (!val) val = '0'
                            let newVal = parseInt(val)
                            setPage(newVal)
                        }}/>
                        <button onClick={() => {
                            setPage(memPage + 1)
                        }}>{'>'}</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='memoryContainer'>
                    {visualiseMemory()}
                </div>
            </div>
            </div>
        </div>
    )
} 

export default ComputerVisualiser