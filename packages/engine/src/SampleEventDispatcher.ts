import Event from '../../core/src/event/Event'
import View from '../../core/src/view/View'
import EventDispatcher from './base/EventDispatcher'

class SampleEventDispatcher implements EventDispatcher {

    get canvas (): HTMLCanvasElement | null | undefined {
        return this._canvas
    }

    get views (): View[] {
        return this._views.sort((left, right) => right.style.zIndex - left.style.zIndex)
    }
    private _canvas: HTMLCanvasElement | null | undefined
    private _views: View []
    constructor () {
        this._canvas = null
        this._views = []
    }


    public with (canvas: HTMLCanvasElement | null | undefined): SampleEventDispatcher {
        this._canvas = canvas
        return this
    }

    public join (views: View []): EventDispatcher {
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

    private forward (views: View []): void {
        const canvas = this._canvas
        if (canvas !== null && canvas !== undefined) {
            const dispatchEvent = (name: string, e: MouseEvent) => {
                const event = new Event(name)
                event.button = e.button
                event.position.x = e.offsetX
                event.position.y = e.offsetY
                let responseView = null
                let res = false
                for (const view of views) {
                    if (responseView !== null && responseView === view) {
                        this.dispatch(event, view)
                    } else {
                        res = this.dispatch(event, view)
                        if (res) {
                            responseView = view
                        } else {
                            view.state = 'static'
                        }
                    }
                }
            }
            canvas.onclick = e => dispatchEvent(Event.EVENT_CLICK, e)
            canvas.onmousedown = e => dispatchEvent(Event.EVENT_MOUSE_DOWN, e)
            canvas.onmouseup = e => dispatchEvent(Event.EVENT_MOUSE_UP, e)
            canvas.onmousemove = e => dispatchEvent(Event.EVENT_MOUSE_MOVE, e)
        }
    }

}

export default SampleEventDispatcher
