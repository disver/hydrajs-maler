import Position from '../view/Position'

class Event {
    private readonly _trigger: string
    private _position: Position
    private _button: number

    constructor (trigger: string) {
        this._trigger = trigger
        this._position = new Position()
        this._button = -1
    }


    get button (): number {
        return this._button
    }

    set button (value: number) {
        this._button = value
    }

    get position (): Position {
        return this._position
    }

    set position (value: Position) {
        this._position = value
    }

    get trigger (): string {
        return this._trigger
    }
}

export default Event
