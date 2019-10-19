import HydraRenderer from '../../core/src/renderer/HydraRenderer'
import View from '../../core/src/view/View'
import EventDispatcher from './base/EventDispatcher'
import dispatcher from './HydraEventDispatcher'

/**
 * @author 4everlynn
 */
class Hydra {
    private readonly _views: View[]
    private _renderer: HydraRenderer
    private readonly _canvas: HTMLCanvasElement
    private _dispatcher: EventDispatcher

    constructor (element: HTMLElement | HTMLCanvasElement) {
        this._canvas = this.createCanvas(element)
        this._renderer = new HydraRenderer(this._canvas.getContext('2d'))
        this._views = []

        // set canvas for dispatcher
        dispatcher
            .with(this._canvas)
            .join(this._views)
            .register()
        this._dispatcher = dispatcher
    }

    /**
     * attach view to hydra
     */
    public attach (view: View) {
        this._views.push(view)
        return this
    }



    /**
     * render components
     */
    public render () {
        for (const view of this._views) {
            // render view to canvas
            this._renderer.render(view)
        }
    }

    // noinspection JSMethodCanBeStatic
    private createCanvas(element: HTMLElement | HTMLCanvasElement) {
        let canvas: HTMLCanvasElement | null = null
        if (element instanceof HTMLCanvasElement) {
            canvas = element
        } else if (element instanceof HTMLDivElement) {
            canvas = document.createElement('canvas')
            canvas.width = element.offsetWidth
            canvas.height = element.offsetHeight
            element.appendChild(canvas)
        } else {
            throw new Error('parameter element cloud only be HTMLDivElement or HTMLCanvasElement')
        }
        if (canvas === null || canvas === undefined) {
            canvas = document.createElement('canvas')
        }
        return canvas
    }
}

export default Hydra
