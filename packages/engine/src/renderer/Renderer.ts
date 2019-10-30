import View from '../../../core/src/view/View'
import Hydra from '../Hydra'

interface Renderer {
    render (view: View, parent: Hydra): void

    setContext (context: CanvasRenderingContext2D | null | undefined): void

    getContext (): CanvasRenderingContext2D | null | undefined
}

export default Renderer
