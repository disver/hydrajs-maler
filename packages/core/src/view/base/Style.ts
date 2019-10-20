import AbstractObserver, {Properties} from '../../../../engine/src/base/AbstractObserver'

@Properties(['handler', 'notify', 'onChanged'])
class Style extends AbstractObserver {
    // margin register
    private _marginTop: number
    private _marginRight: number
    private _marginBottom: number
    private _marginLeft: number
    // margin end

    // padding register
    private _paddingTop: number
    private _paddingRight: number
    private _paddingBottom: number
    private _paddingLeft: number
    // padding end

    // background of view
    private _background: string
    private _handler: (() => void) | null

    constructor () {
        super()
        this._marginTop = 0
        this._marginRight = 0
        this._marginBottom = 0
        this._marginLeft = 0
        this._paddingTop = 0
        this._paddingRight = 0
        this._paddingBottom = 0
        this._marginTop = 0
        this._paddingLeft = 0
        this._background = '#00ff0c'
        this._handler = null
        this.initialize()
    }

    public notify (): void {
        this.onChanged()
    }

    private onChanged (): void {
        this._handler && this._handler()
    }

    get marginTop (): number {
        return this._marginTop
    }

    set marginTop (value: number) {
        this._marginTop = value
    }

    get marginRight (): number {
        return this._marginRight
    }

    set marginRight (value: number) {
        this._marginRight = value
    }

    get marginBottom (): number {
        return this._marginBottom
    }

    set marginBottom (value: number) {
        this._marginBottom = value
    }

    get marginLeft (): number {
        return this._marginLeft
    }

    set marginLeft (value: number) {
        this._marginLeft = value
    }

    get paddingTop (): number {
        return this._paddingTop
    }

    set paddingTop (value: number) {
        this._paddingTop = value
    }

    get paddingRight (): number {
        return this._paddingRight
    }

    set paddingRight (value: number) {
        this._paddingRight = value
    }

    get paddingBottom (): number {
        return this._paddingBottom
    }

    set paddingBottom (value: number) {
        this._paddingBottom = value
    }

    get paddingLeft (): number {
        return this._paddingLeft
    }

    set paddingLeft (value: number) {
        this._paddingLeft = value
    }

    get background (): string {
        return this._background
    }

    set background (value: string) {
        this._background = value
    }

    get handler (): (() => void) | null {
        return this._handler
    }

    set handler (value: (() => void) | null) {
        this._handler = value
    }
}

export default Style
