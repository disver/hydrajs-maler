import Event from '../../core/src/event/Event'
import View from '../../core/src/view/View'
import EventDispatcher from './base/EventDispatcher'

class HydraEventDispatcher implements EventDispatcher {

    get canvas (): HTMLCanvasElement | null | undefined {
        return this._canvas
    }

    get views (): View[] {
        return this._views
    }
    private _canvas: HTMLCanvasElement | null | undefined
    private _views: View []
    constructor () {
        this._canvas = null
        this._views = []
    }

    public ergodic (views: View [], call: (view: View) => boolean): void {
        const target = views.sort((left, right) => right.zIndex - left.zIndex)
        let responseView = null
        for (const view of target) {
            if (responseView !== null && responseView === view) {
                call && (call(responseView))
            } else {
                let res = false
                call && (res = call(view))
                if (res) {
                    responseView = view
                } else {
                    view.state = 'static'
                }
            }
        }
    }

    public with (canvas: HTMLCanvasElement | null | undefined): HydraEventDispatcher {
        this._canvas = canvas
        return this
    }

    public join (views: View []): HydraEventDispatcher {
        if (views.length === 0) {
            this._views = views
        } else {
            this._views = [...views, ...this._views]
        }
        return this
    }

    public register (): void {
        this.forward(this._views)
    }

    public dispatch (event: Event, view: View): boolean {
        return view.receive(event)
    }

    private forward (views: View []) {
        const canvas = this._canvas
        if (canvas !== null && canvas !== undefined) {
            const dispatchEvent = (name: string, e: MouseEvent) => {
                const event = new Event(name)
                event.button = e.button
                event.position.x = e.offsetX
                event.position.y = e.offsetY
                this.ergodic(views, view => {
                    return this.dispatch(event, view)
                })
            }
            canvas.onclick = e => dispatchEvent(Event.EVENT_CLICK, e)
            canvas.onmousedown = e => dispatchEvent(Event.EVENT_MOUSE_DOWN, e)
            canvas.onmouseup = e => dispatchEvent(Event.EVENT_MOUSE_UP, e)
            canvas.onmousemove = e => dispatchEvent(Event.EVENT_MOUSE_MOVE, e)
            canvas.onmouseleave = e => dispatchEvent(Event.EVENT_MOUSE_LEAVE, e)
        }
    }

}

export default new HydraEventDispatcher()
