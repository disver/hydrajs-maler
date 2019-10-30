import Position from '../view/base/Position'
import View from '../view/View'
import Layout from './base/Layout'

class LinearLayout extends Layout{

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
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
            startX: this.position.x,
            endX: this.position.x + this.style.width,
            startY: this.position.y,
            endY: this.position.y + this.style.height
        }
        // record views of each line
        const viewsOfLine: any = {}
        let currentLine = 0

        // push view to current line's array
        const push = (view: View) => {
            if (viewsOfLine[currentLine] === undefined) {
                viewsOfLine[currentLine] = [view]
            } else {
                viewsOfLine[currentLine].push(view)
            }
        }

        // container position
        const position = new Position(this.position.x, this.position.y)
        const children = this.children
        const renderFirstViewInLine = (view: View) => {
            view._position.x = position.x + view.style.marginLeft +
                this.style.paddingLeft - this.style.paddingRight - view.style.marginRight
            view._position.y = this.position.y + view.style.marginTop + this.style.paddingTop
            // push view
            push(view)
        }
        const renderOtherView = (view: View) => {
            const lastView = children[index - 1]
            const targetX = lastView.position.x + lastView.style.width + view.style.marginLeft
                + lastView.style.marginRight - view.style.marginRight
            view._position.x = targetX
            if (targetX + view.style.width > containerBounds.endX) {
                // plus currentLine when view in single line is overflow
                currentLine++
                // overflow in single line
                view._position.x = position.x + view.style.marginLeft + this.style.paddingLeft
                    - view.style.marginRight
            } else {
                view._position.x = targetX
            }
            this.resolveYOfView(view, currentLine, viewsOfLine)
            // push view
            push(view)
        }
        for (const view of children) {
            if (index > 0) {
                renderOtherView(view)
            } else {
                renderFirstViewInLine(view)
            }
            view.render(ctx)
            index++
        }
    }

    private resolveYOfView (view: View, currentLine: number, viewsOfLine: any) {
        // deal style
        if (currentLine > 0) {
            const lastLine: View [] = viewsOfLine[currentLine - 1]
            let bottom = 0
            let y = 0
            for (const lastLineView of lastLine) {
                if (this.boundsInRange(view, lastLineView)) {
                    if (y < lastLineView.style.height + lastLineView.position.y) {
                        y = lastLineView.style.height + lastLineView.position.y
                    }
                    if (bottom < lastLineView.style.marginBottom) {
                        bottom = lastLineView.style.marginBottom
                    }
                }
            }
            view._position.y = y + bottom + view.style.marginTop
        } else {
            view._position.y = this.position.y + this.style.paddingTop + view.style.marginTop
        }
    }

    // noinspection JSMethodCanBeStatic
    private boundsInRange (left: View, right: View): boolean {
        if (left.position.x === right.position.x + right.style.width) {
            return false
        }
        if (left.position.x + left.style.width === right.position.x) {
            return false
        }
        if (left.position.x >= right.position.x) {
            return true
        }
        if (left.position.x + left.style.width <= right.position.x + right.style.width )  {
            return true
        }
        return left.position.x + left.style.width >= left.position.x
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
