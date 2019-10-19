import Hydra from '../../../engine/src/Hydra'
import Event from '../event/Event'
import EventReceiver from '../event/EventReceiver'
import Container from '../layout/base/Container'
import Drawable from './base/Drawable'
import Position from './base/Position'

class View implements Drawable, EventReceiver {
    private _parent: Hydra | Container | null
    private _state: string
    private _width: number
    private _height: number
    private _position: Position
    private _propertyHandler: (() => void) | null

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

    private _draggable: boolean

    // map to resolve if should view should response when specific event appear
    private _registeredEvents: Map<string, (event: Event) => void>
    private _offset: { x: number; y: number } | null


    protected constructor () {
        this._state = 'static'
        this._width = 0
        this._height = 0
        this._background = 'black'
        this._offset = null
        this._position = new Position()
        this._position.handler = () => {
            this.onPropertyChanged()
        }
        this._marginTop = 0
        this._parent = null
        this._marginRight = 0
        this._marginBottom = 0
        this._marginLeft = 0
        this._paddingTop = 0
        this._paddingRight = 0
        this._paddingBottom = 0
        this._paddingLeft = 0
        this._zIndex = 0
        this._draggable = false
        this._registeredEvents = new Map<string, () => void>()
        this._propertyHandler = null
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
            const handler = this._registeredEvents.get(event.name)
            if (event.name === Event.EVENT_MOUSE_MOVE) {
                this.onMove(event)
            }
            if (event.name === Event.EVENT_MOUSE_DOWN) {
                this.onMouseDown(event)
            }
            if (event.name === Event.EVENT_MOUSE_UP) {
                this.onMouseUp(event)
            }
            if (handler) {
                handler(event)
            }
        }
    }



    public propertyChanged (event: () => void): void {
        this._propertyHandler = event
    }

    public onPropertyChanged () {
        this._propertyHandler && this._propertyHandler()
    }

    public onMouseDown (event: Event): void {
        if (this._draggable) {
            this._offset = {
                x: event.position.x - this.position.x,
                y: event.position.y - this.position.y
            }
            this._state = 'start_drag'
        }
    }

    public onMouseUp (event: Event): void {
        if (this._draggable) {
            this._state = 'static'
            console.log(this)
        }
    }


    public onMove (event: Event): void {
        if (this._draggable && this._state === 'start_drag' || this._state === 'dragging') {
            if (this._state !== 'dragging') {
                this._state = 'dragging'
            }
            if (this._offset !== null) {
               this.position.x = event.position.x  - this._offset.x
               this.position.y = event.position.y  - this._offset.y
           }
        }
    }

    public trigger (event: Event): boolean {
        // if view has registered event
        if (this._registeredEvents.get(event.name)) {
            const mouseX = event.position.x
            const mouseY = event.position.y

            const viewX = this.position.x
            const viewY = this.position.y

            if ((mouseX >= viewX && mouseX <= viewX + this.width)
                && (mouseY >= viewY && mouseY <= viewY + this.height)) {
                return true
            }
        }
        return false
    }


    get draggable (): boolean {
        return this._draggable
    }

    set draggable (value: boolean) {
        this._draggable = value
        if (!this._registeredEvents.get(Event.EVENT_MOUSE_MOVE)) {
            this.addEventListener(Event.EVENT_MOUSE_MOVE, (event: Event) => {
                console.log()
            })
        }
        if (!this._registeredEvents.get(Event.EVENT_MOUSE_DOWN)) {
            this.addEventListener(Event.EVENT_MOUSE_DOWN, (event: Event) => {
                console.log()
            })
        }
        if (!this._registeredEvents.get(Event.EVENT_MOUSE_UP)) {
            this.addEventListener(Event.EVENT_MOUSE_UP, (event: Event) => {
                console.log()
            })
        }
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
        this.onPropertyChanged()
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


    get parent (): Hydra | Container | null {
        return this._parent
    }

    set parent (value: Hydra | Container | null) {
        this._parent = value
    }
}

export default View
