import Position from '../view/Position'

class Event {
    private readonly _name: string
    private _position: Position
    private _button: number

    constructor (name: string) {
        this._name = name
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

    get name (): string {
        return this._name
    }
}

export default Event
