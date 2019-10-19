class Position {
    private _x: number
    private _y: number


    constructor (x: number = 0, y: number = 0) {
        this._x = x
        this._y = y
    }

    get x (): number {
        return this._x
    }

    set x (value: number) {
        this._x = value
    }

    get y (): number {
        return this._y
    }

    set y (value: number) {
        this._y = value
    }
}
export default Position
