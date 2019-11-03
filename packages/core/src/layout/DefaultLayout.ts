import Layout from './base/Layout'

class DefaultLayout extends Layout {
    constructor () {
        super ()
    }


    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            for (const view of this.children) {
                view.render(ctx)
            }
        })
    }
}
export default DefaultLayout
