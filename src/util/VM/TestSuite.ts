import CPU from './CPU'



// TODO: Create Test Suite

interface testOptions{
    name: string
    given: any
    then: any
}


class TestSuite{
    private CPUInstance: CPU
    private tests: Array<testOptions>
    constructor(CPUInstance: CPU){
        this.CPUInstance = CPUInstance
        this.tests = []
    }

    public createTest(options: testOptions){
        this.tests.push(options)
    }

    public run(){

        let ID: any = setInterval(() => {
            let test = this.tests.shift()
            if (!test) return clearInterval(ID)
            this.executeTest(test)
        }, 100)
           
    }



    private setParameter(parameterString: string){
        parameterString = parameterString.replace(' ','')
        let parameterStringArray = parameterString.split('=')
        let parameterID = parameterStringArray[0].slice(0,3)

        switch(parameterID){
            case 'REG':
                let REGID = parameterStringArray[0].split('[')[1].replace(']','') as any
                this.CPUInstance.setRegister(REGID, parseInt(parameterStringArray[1]))
                break;

            case 'FLG':
                let FLAGID = parameterStringArray[0].split('[')[1].replace(']','') as any
                this.CPUInstance.setFlag(FLAGID, parameterStringArray[1] === 'true' ? true : false)
                break;

            case 'MEM':
                let MEMID = parameterStringArray[0].split('[')[1].replace(']','') as any
                this.CPUInstance.writeByte(MEMID,  parseInt(parameterStringArray[1]), true, true, true)
                break;


            case 'RST':
                Object.values(this.CPUInstance.partitionMap).forEach((mem: any) => {
                    mem.wipeMemory()
                })
                this.CPUInstance.reset()

        }

    }


    private testParameter(parameterString: string){
        parameterString = parameterString.replace(' ','')
        let parameterStringArray = parameterString.split('=')
        let parameterID = parameterStringArray[0].slice(0,3)

        switch(parameterID){
            case 'REG':
                let REGID = parameterStringArray[0].split('[')[1].replace(']','') as any
                let val = this.CPUInstance.getRegister(REGID)
                console.log(val)
                return val === parseInt(parameterStringArray[1])
                break;

            case 'FLG':
                let FLAGID = parameterStringArray[0].split('[')[1].replace(']','') as any
                let boolRep: boolean = parameterStringArray[1] === 'true' ? true : false
                return this.CPUInstance.getFlag(FLAGID) === boolRep
                break;

            case 'MEM':
                let MEMID = parameterStringArray[0].split('[')[1].replace(']','') as any
                return this.CPUInstance.readByte(MEMID, true, true) ===  parseInt(parameterStringArray[1])
                break;

            case 'NUL':
                return true

        }

    }

    private executeTest(options: testOptions){
        let testName = options.name
        let startingParameters = options.given
        let tests = options.then

        startingParameters.forEach((value: string) => {
            this.setParameter(value)
        });

        tests.unshift('NUL')
        setTimeout(() => {
            tests.forEach((value: string) => {
                if (!this.testParameter(value)) throw new Error(`${testName}: ${value} failed`)
            });

            console.log(`${testName} Completed Succesfully`)
        }, 10)
        
        return false
    }

}

export default TestSuite