import Position from '../view/base/Position'

class Event {
    public static _EVENT_CLICK: string = 'click'
    public static _EVENT_MOUSE_DOWN: string = 'mouse_down'
    public static _EVENT_MOUSE_MOVE: string = 'mouse_move'
    public static _EVENT_MOUSE_LEAVE: string = 'mouse_leave'
    public static _EVENT_MOUSE_UP: string = 'mouse_up'
    private readonly _name: string
    private _position: Position
    private _button: number

    constructor (name: string) {
        this._name = name
        this._position = new Position()
        this._button = -1
    }


   static get EVENT_CLICK (): string {
        return Event._EVENT_CLICK
    }

    static get EVENT_MOUSE_DOWN (): string {
        return Event._EVENT_MOUSE_DOWN
    }

    static get EVENT_MOUSE_MOVE (): string {
        return Event._EVENT_MOUSE_MOVE
    }

    static get EVENT_MOUSE_LEAVE (): string {
        return Event._EVENT_MOUSE_LEAVE
    }

    static get EVENT_MOUSE_UP (): string {
        return Event._EVENT_MOUSE_UP
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
