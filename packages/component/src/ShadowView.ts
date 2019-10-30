import Event from '../../core/src/event/Event'
import View from '../../core/src/view/View'

class ShadowView extends View {
    private _status: number = 1

    constructor () {
        super()
        this._status = 1
        this.style.background = '#0bb6ff'
        this.style.shadowColor = 'grey'
        this.style.shadowBlur = 3
    }


    public onMeasure (): void {
        super.onMeasure()
    }

    public onMouseUp (event: Event): void {
        super.onMouseUp(event)
        this._status = 1
        this.animate({
            style: {
                shadowBlur: 3,
            },
            duration: 500
        })
    }


    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            ctx.fillRect(this._position.x, this._position.y, this._style.width, this._style.height)
        })
    }

    public onMouseEnter (event: Event): void {
        super.onMouseEnter(event)
        this.animate({
            style: {
                shadowBlur: 5,
            },
            duration: 500
        })
    }


    public onMouseLeave (event: Event): void {
        super.onMouseLeave(event)
        this.animate({
            style: {
                shadowBlur: 3,
            },
            duration: 500
        })
    }

    public onMouseDown (event: Event): void {
        super.onMouseDown(event)
        this.animate({
            style: {
                shadowBlur: 1,
            },
            duration: 500
        })
        this._status = 0
    }
}

export default ShadowView
