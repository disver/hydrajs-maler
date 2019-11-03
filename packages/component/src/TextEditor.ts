import View from '../../core/src/view/View'

class TextEditor extends View{
    private readonly origin: string
    constructor () {
        super()
        this._style.width = 300
        this._style.height = 50
        this._style.background = 'white'
        this.origin = this.data().cursor.color
        this.bindEvent()
    }

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            ctx.fillRect(this.position.x, this.position.y, this.style.width, this.style.height)
            ctx.fillStyle = this.props.cursor.color
            ctx.fillRect(this.position.x + 6, this.position.y + 6, 1, this.style.height - 12)
        })
    }


    protected data (): any {
        return {
            cursor: {
                color: 'black'
            }
        }
    }


    private bindEvent () {
        // frame to render cursor
        const frame = 500
        if (this.props.cursor.color !== this.style.background) {
            this.props.cursor.color = this.style.background
        } else {
            this.props.cursor.color = this.origin
        }
        setTimeout(() => {
            this.bindEvent()
        }, frame)
    }
}
export default TextEditor
