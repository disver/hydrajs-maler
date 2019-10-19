class Position {
    private _x: number
    private _y: number
    private _handler: (() => void) | null

    constructor (x: number = 0, y: number = 0) {
        this._x = x
        this._y = y
        this._handler = null
    }


    set handler (value: (() => void) | null) {
        this._handler = value
    }

    get x (): number {
        return this._x
    }

    set x (value: number) {
        this._x = value
        this.onChanged()
    }

    get y (): number {
        return this._y
    }

    set y (value: number) {
        this._y = value
        this.onChanged()
    }

    private onChanged (): void {
        this._handler && this._handler()
    }
}
export default Position
