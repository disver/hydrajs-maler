import View from '../view/View'
import Layout from './base/Layout'

class AbsoluteLayout extends Layout{
    constructor () {
        super()
    }


    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        for (const view of this.children) {
            this.calculatePosition(view)
            view.render(context)
            this.fetch(context, ctx => {
                if (view.position.x > this.position.x + this.style.width
                    || view.position.x + view.style.width > this.position.x + this.style.width) {
                    const bound = this.position.x + this.style.width + this.style.borderWeight
                    ctx.clearRect(bound, view.position.y,
                        (view.position.x + view.style.width - bound),  view.style.height)
                }
                if (view.position.x < this.position.x
                    || view.position.x + view.style.width > this.position.x) {
                    ctx.clearRect(this.position.x - this.style.borderWeight, view.position.y,
                        -(Math.abs(view.position.x - this.position.x)),  view.style.height)
                }
                if (view.position.y > this.position.y + this.style.height
                    || view.position.y + view.style.height > this.position.y + this.style.height) {
                    const bound = this.position.y + this.style.height + this.style.borderWeight
                    ctx.clearRect(view.position.x, bound,
                        view.style.width,  view.position.y + view.style.height - bound)
                }
                if (view.position.y < this.position.y
                    || view.position.y + view.style.height > this.position.y) {
                    ctx.clearRect(view.position.x, this.position.y - this.style.borderWeight,
                        view.style.width,  -(Math.abs(view.position.y - this.position.y)))
                }
            })
        }
    }

    private calculatePosition (view: View) {
        // calculate the relative position of the View and the container
        const container = {
            x: this.position.x,
            y: this.position.y
        }

        view._position.x = container.x
        view._position.y = container.y
        if (view.style.left !== null) {
            view._position.x += view.style.left
        } else {
            if (view.style.right !== null) {
                view._position.x = this.position.x + this.style.width - (view.style.width + view.style.right)
            }
        }

        if (view.style.top !== null) {
            view._position.y += view.style.top
        } else {
            if (view.style.bottom !== null) {
                view._position.y = this.position.y + this.style.height - (view.style.height + view.style.bottom)
            }
        }
    }
}
export default AbsoluteLayout
