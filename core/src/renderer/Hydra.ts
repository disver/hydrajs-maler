import View from '../view/View'
import HydraRenderer from './HydraRenderer'

class Hydra {
    private readonly _views: View[]
    private _renderer: HydraRenderer
    private _canvas: HTMLCanvasElement

    constructor (element: HTMLDivElement | HTMLCanvasElement) {
        let canvas: HTMLCanvasElement | null = null
        if (element instanceof HTMLCanvasElement) {
            canvas = element
        } else if (element instanceof HTMLElement) {
            canvas = document.createElement('canvas')
            element.appendChild(canvas)
        } else {
            throw new Error('parameter element cloud only be HTMLDivElement or HTMLCanvasElement')
        }
        if (canvas === null || canvas === undefined) {
            canvas = document.createElement('canvas')
        }
        this._canvas = canvas
        this._renderer = new HydraRenderer(this._canvas.getContext('2d'))
        this._views = []
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
}

export default Hydra
