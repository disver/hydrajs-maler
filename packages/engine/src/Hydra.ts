import Container from '../../core/src/layout/base/Container'
import View from '../../core/src/view/View'
import {sortView} from '../../tools/Collections'
import EventDispatcher from './base/EventDispatcher'
import HydraRenderer from './renderer/HydraRenderer'
import SampleEventDispatcher from './SampleEventDispatcher'
/**
 * @author 4everlynn
 */
class Hydra implements Container{
    private readonly _views: View[]
    private _renderer: HydraRenderer
    private readonly _canvas: HTMLCanvasElement
    private _dispatcher: EventDispatcher

    constructor (element: HTMLElement | HTMLCanvasElement) {
        this._canvas = this.createCanvas(element)
        this._renderer = new HydraRenderer(this._canvas.getContext('2d'))
        this._views = []
        // set canvas for dispatcher
        const dispatcher = new SampleEventDispatcher()
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
        const context = this._canvas.getContext('2d')
        if (null != context) {
            // clear canvas to render new frame
            context.clearRect(0, 0, this._canvas.width, this._canvas.height)
            const renderView = this._views.sort(sortView)
            for (const view of renderView) {
                // render view to canvas
                this._renderer.render(view, this)
            }
        }
    }

    // noinspection JSMethodCanBeStatic
    private createCanvas (element: HTMLElement | HTMLCanvasElement) {
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
        this.configHighDpiCanvas(canvas)
        return canvas
    }

    // noinspection JSMethodCanBeStatic
    /**
     * configure high resolution for the canvas
     */
    private configHighDpiCanvas (canvas: HTMLCanvasElement) {
        const dpr = window.devicePixelRatio
        const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect()
        canvas.style.width = canvas.width + 'px'
        canvas.style.height = canvas.height + 'px'
        canvas.width = dpr * cssWidth
        canvas.height = dpr * cssHeight
        const context = canvas.getContext('2d')
        if (context !== undefined && context !== null) {
            context.scale(dpr, dpr)
        }
    }
}


export default Hydra
