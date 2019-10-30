class Style {
    private _width: number
    private _height: number
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
    // z index
    private _zIndex: number

    // shadow
    private _shadowBlur: number
    private _shadowColor: string
    private _shadowOffsetX: number
    private _shadowOffsetY: number

    // start font
    private _fontSize: number
    private _fontColor: string
    private _fontFamily: string

    // start border
    private _borderColor: string
    private _borderWeight: number

    constructor () {
        this._width = 0
        this._height = 0
        this._marginTop = 0
        this._marginRight = 0
        this._marginBottom = 0
        this._marginLeft = 0
        this._paddingTop = 0
        this._paddingRight = 0
        this._shadowBlur = 0
        this._shadowColor = ''
        this._paddingBottom = 0
        this._shadowOffsetX = 0
        this._shadowOffsetY = 0
        this._marginTop = 0
        this._paddingLeft = 0
        this._background = '#ffffff'
        this._zIndex = 0
        this._fontColor = 'white'
        this._fontSize = 14
        this._fontFamily = 'Arial'
        this._borderColor = 'white'
        this._borderWeight = 0
    }


    get borderColor (): string {
        return this._borderColor
    }

    set borderColor (value: string) {
        this._borderColor = value
    }

    get borderWeight (): number {
        return this._borderWeight
    }

    set borderWeight (value: number) {
        this._borderWeight = value
    }

    get shadowBlur (): number {
        return this._shadowBlur
    }

    set shadowBlur (value: number) {
        this._shadowBlur = value
    }

    get shadowColor (): string {
        return this._shadowColor
    }

    set shadowColor (value: string) {
        this._shadowColor = value
    }

    get width (): number {
        return this._width
    }

    set width (value: number) {
        this._width = value
    }

    get height (): number {
        return this._height
    }

    set height (value: number) {
        this._height = value
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

    get zIndex (): number {
        return this._zIndex
    }

    set zIndex (value: number) {
        this._zIndex = value
    }


    get shadowOffsetX (): number {
        return this._shadowOffsetX
    }

    set shadowOffsetX (value: number) {
        this._shadowOffsetX = value
    }

    get shadowOffsetY (): number {
        return this._shadowOffsetY
    }

    set shadowOffsetY (value: number) {
        this._shadowOffsetY = value
    }

    get background (): string {
        return this._background
    }

    set background (value: string) {
        this._background = value
    }


    get fontSize (): number {
        return this._fontSize
    }

    set fontSize (value: number) {
        this._fontSize = value
    }

    get fontColor (): string {
        return this._fontColor
    }

    set fontColor (value: string) {
        this._fontColor = value
    }

    get fontFamily (): string {
        return this._fontFamily
    }

    set fontFamily (value: string) {
        this._fontFamily = value
    }
}

export default Style
