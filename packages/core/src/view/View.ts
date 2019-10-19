import Event from '../event/Event'
import EventReceiver from '../event/EventReceiver'
import Drawable from './Drawable'
import Position from './Position'

class View implements Drawable, EventReceiver{
    private _width: number
    private _height: number
    private _position: Position

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

    // map to resolve if should view should response when specific event appear
    private _registeredEvents: Map<string, (event: Event) => void>


   protected constructor () {
        this._width = 0
        this._height = 0
        this._background = 'black'
        this._position = new Position()
        this._marginTop = 0
        this._marginRight = 0
        this._marginBottom = 0
        this._marginLeft = 0
        this._paddingTop = 0
        this._paddingRight = 0
        this._paddingBottom = 0
        this._paddingLeft = 0
        this._zIndex = 0
        this._registeredEvents = new Map<string, () => void>()
    }


    public addEventListener (name: string, handler: (event: Event) => void): void {
        this._registeredEvents.set(name, handler)
    }


    public render (context: CanvasRenderingContext2D | null | undefined) {
        if (context instanceof CanvasRenderingContext2D) {
            context.fillStyle = this._background
            context.fillRect(this._position.x, this._position.y, this._width, this._height)
        }
    }


    public receive (event: Event): void {
        if (this.trigger(event)) {
           const handler = this._registeredEvents.get(event.trigger)
           if (handler) {
               handler(event)
           }
        }
    }

    public trigger (event: Event): boolean {
        // if view has registered event
        if (this._registeredEvents.get(event.trigger)) {
           return true
        }
        return false
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

    get position (): Position {
        return this._position
    }

    set position (value: Position) {
        this._position = value
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

    get zIndex (): number {
        return this._zIndex
    }

    set zIndex (value: number) {
        this._zIndex = value
    }
}

export default View
