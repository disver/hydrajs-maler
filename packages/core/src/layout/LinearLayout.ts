import Position from '../view/base/Position'
import View from '../view/View'
import Layout from './base/Layout'

class LinearLayout extends Layout{

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            ctx.strokeStyle = 'black'
            ctx.strokeRect(this.position.x, this.position.y, this.style.width, this.style.height)
            if (this.props.direction === 'horizontal') {
                this.renderHorizontal(ctx)
            }
            if (this.props.direction === 'vertical') {
                this.renderVertical(ctx)
            }
        })
    }

    protected data (): any {
        return {
            // vertical || horizontal
            direction: 'vertical'
        }
    }

    // noinspection JSMethodCanBeStatic
    private renderHorizontal (ctx: CanvasRenderingContext2D) {
        let index = 0
        const containerBounds = {
            width: this.position.x + this.style.width,
            height: this.position.y + this.style.height
        }
        const position = new Position(this.position.x, this.position.y)
        const children = this.children
        const renderFirstView = (view: View) => {
            view._position.x = position.x + view.style.marginLeft + this.style.paddingLeft
                - view.style.marginRight
        }
        const renderOtherView = (view: View) => {
            const lastView = children[index - 1]
            const targetX = lastView.position.x + lastView.style.width + view.style.marginLeft
                + lastView.style.marginRight - view.style.marginRight
            view._position.x = targetX
            if (targetX + view.style.width > containerBounds.width) {
                // overflow in single line
                renderFirstView(view)
                view._position.y = this.position.y + lastView.position.y + lastView.style.height
            } else {
                view._position.x = targetX
            }
        }
        for (const view of children) {
            if (index > 0) {
                renderOtherView(view)
            } else {
                renderFirstView(view)
            }
            view.render(ctx)
            index++
        }
    }

    // noinspection JSMethodCanBeStatic
    private renderVertical (ctx: CanvasRenderingContext2D) {
        let index = 0
        const position = new Position(this.position.x, this.position.y)
        const children = this.children
        for (const view of children) {
            view._position.x = position.x + view.style.marginLeft + this.style.paddingLeft
                - view.style.marginRight
            if (index === 0) {
                view._position.y = position.y + view.style.marginTop + this.style.paddingTop
            } else {
                const lastView = children[index - 1]
                view._position.y = lastView.position.y +
                    lastView.style.height + lastView.style.marginBottom + view.style.marginTop
            }
            view.render(ctx)
            index++
       }
    }
}

export default LinearLayout
