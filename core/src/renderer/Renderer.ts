import View from '../view/View'

interface Renderer {
    render (view: View): void

    setContext (context: CanvasRenderingContext2D | null | undefined): void

    getContext (): CanvasRenderingContext2D | null | undefined
}

export default Renderer
