import Event from '../../event/Event'
import View from '../../view/View'
import Container from './Container'

abstract class Layout extends View implements Container {
    private readonly _children: View []

    protected constructor () {
        super()
        this._children = []
    }

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, () => {
            for (const view of this.children) {
              if (view.hydra === null) {
                  view.hydra = this.hydra
              }
            }
        })
    }

    public attach (view: View): void {
        view.hydra = this.hydra
        this._children.push(view)
    }

    public receive (event: Event): boolean {
        super.receive(event)
        // dispatch to children views
        for (const view of this._children) {
            view.receive(event)
        }
        return true
    }


    get children (): View[] {
        return this._children
    }
}

export default Layout
