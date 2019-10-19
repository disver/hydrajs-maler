import Hydra from '../../../engine/src/Hydra'
import View from '../view/View'

interface Renderer {
    render (view: View, parent: Hydra): void

    setContext (context: CanvasRenderingContext2D | null | undefined): void

    getContext (): CanvasRenderingContext2D | null | undefined
}

export default Renderer
