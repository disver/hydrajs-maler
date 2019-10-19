class Event {
    private readonly _trigger: string


    constructor (trigger: string) {
        this._trigger = trigger
    }


    get trigger (): string {
        return this._trigger
    }
}

export default Event
