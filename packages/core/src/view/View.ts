import AbstractObserver, {Property} from '../../../engine/src/base/AbstractObserver'
import Hydra from '../../../engine/src/Hydra'
import Event from '../event/Event'
import EventReceiver from '../event/EventReceiver'
import Drawable from './base/Drawable'
import Position from './base/Position'
import Style from './base/Style'

class View extends AbstractObserver implements Drawable, EventReceiver {
    private _hydra: Hydra | null
    private _state: string
    @Property()
    private _width: number
    @Property()
    private _height: number
    @Property()
    private _position: Position
    @Property()
    private _style: Style

    // z index
    private _zIndex: number

    private _draggable: boolean

    // map to resolve if should view should response when specific event appear
    private _registeredEvents: Map<string, (event: Event) => void>
    private _offset: { x: number; y: number } | null


    protected constructor () {
        super()
        this._state = 'static'
        this._width = 0
        this._height = 0
        this._style = new Style()
        this._offset = null
        this._position = new Position()
        this._position.handler = () => {
            this.notify()
        }
        this._hydra = null
        this._zIndex = 0
        this._draggable = false
        this._registeredEvents = new Map<string, () => void>()
        this.initialize()
    }


    public addEventListener (name: string, handler: (event: Event) => void): void {
        this._registeredEvents.set(name, handler)
    }


    public render (context: CanvasRenderingContext2D | null | undefined) {
        if (context instanceof CanvasRenderingContext2D) {
            context.fillStyle = this._style.background
            context.fillRect(this._position.x, this._position.y, this._width, this._height)
        }
    }


    public receive (event: Event): boolean {
        if (this.trigger(event)) {
            const handler = this._registeredEvents.get(event.name)
            if (event.name === Event.EVENT_MOUSE_MOVE) {
                this.onMove(event)
            }
            if (event.name === Event.EVENT_MOUSE_LEAVE) {
                this.onMouseLeave(event)
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
            return true
        }
        return false
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
        }
    }


    public onMouseEnter (event: Event): void {
        console.log()
    }


    public onMouseLeave (event: Event): void {
        console.log()
    }


    public onMove (event: Event): void {
        if (this._draggable && this._state === 'start_drag' || this._state === 'dragging') {
            if (this._state !== 'dragging') {
                this._state = 'dragging'
            }
            if (this._offset !== null) {
                this.position.x = event.position.x - this._offset.x
                this.position.y = event.position.y - this._offset.y
            }
        }
    }

    public trigger (event: Event): boolean {
        if (this._state === 'dragging') {
            return true
        }
        // if view has registered event
        if (this._registeredEvents.get(event.name)) {
            const mouseX = event.position.x
            const mouseY = event.position.y

            const viewX = this.position.x
            const viewY = this.position.y

            if ((mouseX >= viewX && mouseX <= viewX + this.width)
                && (mouseY >= viewY && mouseY <= viewY + this.height)) {
                this.onMouseEnter(event)
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


    get hydra (): Hydra | null {
        return this._hydra
    }

    set hydra (value: Hydra | null) {
        this._hydra = value
    }

    get state (): string {
        return this._state
    }

    set state (value: string) {
        this._state = value
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

    get style (): Style {
        return this._style
    }

    set style (value: Style) {
        this._style = value
    }

    get zIndex (): number {
        return this._zIndex
    }

    set zIndex (value: number) {
        this._zIndex = value
    }

    public notify (): void {
        if (null !== this._hydra) {
            this._hydra.render()
        }
    }
}

export default View
