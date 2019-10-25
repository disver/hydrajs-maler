// @ts-ignore
import TWEEN from '@tweenjs/tween.js/dist/tween.esm.js'
import DataProxy from '../../../engine/src/base/proxy/DataProxy'
import Hydra from '../../../engine/src/Hydra'
import Event from '../event/Event'
import EventReceiver from '../event/EventReceiver'
import AnimationSupport from './base/AnimationSupport'
import Drawable from './base/Drawable'
import Position from './base/Position'
import Style from './base/Style'

class View extends DataProxy implements Drawable, EventReceiver, AnimationSupport {
    private _hydra: Hydra | null
    private _state: string
    private _position: Position
    private _style: Style

    private _draggable: boolean

    // map to configureProperties if should view should response when specific event appear
    private _registeredEvents: Map<string, (event: Event) => void>
    private _offset: { x: number; y: number } | null


    public constructor () {
        super()
        this._state = 'static'
        this._style = new Style()
        this._offset = null
        this._position = new Position()
        this._hydra = null
        this._draggable = false
        this._registeredEvents = new Map<string, () => void>()
        this.bindData()
    }


    public addEventListener (name: string, handler: (event: Event) => void): void {
        this._registeredEvents.set(name, handler)
    }


    public render (context: CanvasRenderingContext2D | null | undefined) {
        if (context instanceof CanvasRenderingContext2D) {
            context.fillStyle = this._style.background
            context.fillRect(this._position.x, this._position.y, this._style.width, this._style.height)
        }
    }


    public receive (event: Event): boolean {
        if (this.trigger(event)) {
            this.onMouseEnter(event)
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
            // if view has registered event
            if (this._registeredEvents.get(event.name)) {
                const handler = this._registeredEvents.get(event.name)
                handler && handler(event)
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
                // if view has registered event
                if (this._registeredEvents.get(Event.EVENT_MOUSE_DRAG)) {
                    const dragEvent = new Event(Event.EVENT_MOUSE_DRAG)
                    dragEvent.position = event.position
                    dragEvent.button = event.button
                    const handler = this._registeredEvents.get(Event.EVENT_MOUSE_DRAG)
                    handler && handler(dragEvent)
                }
            }
        }
    }

    public trigger (event: Event): boolean {
        if (this._state === 'dragging') {
            return true
        }

        const mouseX = event.position.x
        const mouseY = event.position.y

        const viewX = this.position.x
        const viewY = this.position.y

        return (mouseX >= viewX && mouseX <= viewX + this._style.width)
            && (mouseY >= viewY && mouseY <= viewY + this._style.height)
    }

    public notify (): void {
        if (this._hydra !== undefined && this._hydra !== null) {
            this._hydra.render()
        }
    }

    public onMeasure (): void {
        // this.width = this._width
        // this.height = this._height
    }

    public animate (options: any): void {
        let id: any = null
        const ani = (time: any) => {
            id = requestAnimationFrame(ani)
            TWEEN.update(time)
        }
        requestAnimationFrame(ani)
        const cords: any = {}
        const positionKeys: string [] = Object.getOwnPropertyNames(this.position)
        const target: any = {}
        if (options.hasOwnProperty('position')) {
            const _position: any = options.position
            for (const key of Object.getOwnPropertyNames(_position)) {
                if (positionKeys.indexOf('_'.concat(key)) !== -1) {
                    const value = Reflect.get(this._position, key)
                    Reflect.set(cords, key, value)
                    target[key] = options.position[key]
                }
            }
        }
        const styleKeys: string [] = Object.getOwnPropertyNames(this.style)
        if (options.hasOwnProperty('style')) {
            const _style: any = options.style
            for (const key of Object.getOwnPropertyNames(_style)) {
                if (styleKeys.indexOf('_'.concat(key)) !== -1) {
                    const value = Reflect.get(this._style, key)
                    Reflect.set(cords, key, value)
                    target[key] = options.style[key]
                }
            }
        }
        console.log(cords)
        console.log(target)
        new TWEEN.Tween(cords)
            .easing(TWEEN.Easing.Elastic.InOut)
            .to(target, 3000)
            .onUpdate(() => {
                for (const key of Object.keys(cords)) {
                   if (cords.hasOwnProperty(key) && styleKeys.indexOf('_'.concat(key)) !== -1) {
                       Reflect.set(this.style, key, cords[key])
                   }
                   if (cords.hasOwnProperty(key) && positionKeys.indexOf('_'.concat(key)) !== -1) {
                        Reflect.set(this.position, key, cords[key])
                    }
                }
            })
            .onComplete(() => {
                cancelAnimationFrame(id)
            })
            .start()
    }
    /**
     * bind chain data of view
     */
    private bindData () {
        const handler = {
            get: (obj: any, property: string) => {
                return obj[property]
            },
            set: (obj: any, property: string, value: any) => {
                const result = Reflect.set(obj, property, value)
                if (result) {
                    this.notify()
                }
                return result
            }
        }
        this._proxies.style = new Proxy(this._style, handler)
        this._proxies.position = new Proxy(this._position, handler)
    }



    get draggable (): boolean {
        return this._draggable
    }

    set draggable (value: boolean) {
        this._draggable = value
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

    get registeredEvents (): Map<string, (event: Event) => void> {
        return this._registeredEvents
    }

    set registeredEvents (value: Map<string, (event: Event) => void>) {
        this._registeredEvents = value
    }

    get position (): Position {
        return this._proxies.position
    }

    set position (value: Position) {
        this._position = value
    }

    get style (): Style {
        return this._proxies.style
    }

    set style (value: Style) {
        this._style = value
    }
}

export default View
