import Hydra from '../../../engine/src/Hydra'
import View from '../view/View'
import Renderer from './Renderer'

class HydraRenderer implements Renderer {
    private _context: CanvasRenderingContext2D | null | undefined

    constructor (context: CanvasRenderingContext2D | null | undefined) {
        this._context = context
    }

    /**
     * call view's render function and support context2D for view
     */
    public render (view: View, parent: Hydra) {
        if (view.hydra === null) {
            view.hydra = parent
        }
        view.render(this.getContext())
    }

    /**
     * return current context
     */
    public getContext (): CanvasRenderingContext2D | null | undefined {
        return this._context
    }

    /**
     * set render context
     */
    public setContext (context: CanvasRenderingContext2D | null | undefined) {
        this._context = context
    }
}

export default HydraRenderer
