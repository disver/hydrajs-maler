import Event from '../../core/src/event/Event'
import View from '../../core/src/view/View'
import EventDispatcher from './base/EventDispatcher'

class HydraEventDispatcher implements EventDispatcher {
    private readonly _canvas: HTMLCanvasElement | null | undefined
    private readonly _views: View[]
    constructor (canvas: HTMLCanvasElement | null | undefined, views: View []) {
        this._canvas = canvas
        this._views = views
        this.forward(this._canvas)
    }

    public dispatch (event: Event, view: View): void {
        view.receive(event)
    }

    private ergodic (call: (view: View) => void) {
        for (const view of this._views) {
            call && call(view)
        }
    }

    private forward (canvas: HTMLCanvasElement | undefined | null) {
        if (canvas !== null && canvas !== undefined) {
            canvas.onclick = e => {
                const event = new Event('click')
                this.ergodic(view => {
                    this.dispatch(event, view)
                })
            }
        }
    }
}

export default HydraEventDispatcher
