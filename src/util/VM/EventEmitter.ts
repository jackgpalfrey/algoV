interface EventStore{
    [key: string]: Array<Function>
}

class EventEmitter{
    private events: EventStore
    private status: any
    constructor(){

        this.events = {}
        this.status = {}
    }

    protected emitEvent(name: string, data?: any){
        let triggers = this.events[name]
        if (!triggers || !Array.isArray(triggers)) return false
        triggers.forEach((func) => {
            func(data)
        })
    }

    protected setStatus(name: string, value: any){
        this.status[name] = value
    }

    public on(name: string, callback:(data: any) => void){
        if (!this.events[name] || !Array.isArray(this.events[name])) {
            this.events[name] = [callback]
            return true
        }
        this.events[name].push(callback)
    }

    public getStatus(name: string){
        return this.status[name]
    }
}

export default EventEmitter