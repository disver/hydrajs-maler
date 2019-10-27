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

    private renderHorizontal (ctx: CanvasRenderingContext2D) {
        let index = 0
        // record last view's position
        const pos = new Position(this.position.x, this.position.y)
        const temporaryViews = new Map<number, View []>()
        const maxHeights: any = {}
        let line = 0
        for (const view of this.children) {
            view._position.x = pos.x + view.style.marginLeft
            view._position.y = pos.y + view.style.marginTop
            if (temporaryViews.get(line) === undefined) {
                temporaryViews.set(line, [view])
            }
            if (maxHeights[line] === undefined) {
                maxHeights[line] = view.style.height
            }
            const currentLine = temporaryViews.get(line)
            if (index > 0) {
                const lastView = this.children[index - 1]
                // view's position overflow in single line
                if ((view.position.x + view.style.width) > (this.position.x + this.style.width)) {
                    view._position.x = this.position.x + view.style.marginLeft
                    pos.x = this.position.x + view.style.marginLeft
                    let maxBottom = 0
                    // get last line's views
                    const temp = temporaryViews.get(line)
                    if (temp !== undefined) {
                        for (const v of temp) {
                            if (view.position.x >=
                                v.position.x && view.position.x <= (v.position.x + v.style.width))  {
                                const marginBottom = v.style.marginBottom
                                if (marginBottom > maxBottom) {
                                    maxBottom = marginBottom
                                }
                            }
                        }
                        view._position.y += maxHeights[line] + maxBottom
                        pos.y += maxHeights[line]
                    }
                    line++
                    temporaryViews.set(line, [view])
                    maxHeights[line] = view.style.height
                } else {
                    view._position.x += lastView.style.marginRight
                    pos.x += lastView.style.marginRight
                    if (currentLine !== undefined) {
                        currentLine.push(view)
                    }
                    if (view.style.height > maxHeights[line]) {
                        maxHeights[line] = view.style.height
                    }
                }
            }
            view.render(ctx)
            pos.x += view.style.width
            index++
        }
    }

    // noinspection JSMethodCanBeStatic
    private renderVertical (ctx: CanvasRenderingContext2D) {
        console.log(ctx)
    }
}

export default LinearLayout
