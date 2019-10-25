import Event from '../../core/src/event/Event'
import View from '../../core/src/view/View'

class ShadowView extends View{
    private _shadowHeight: number
    private _shadowColor: string
    private readonly _shadow: {
        x: number,
        y: number
    }
    private _status: number = 1

    constructor () {
        super()
        this._shadowHeight = 5
        this._shadowColor = '#0672a0'
        this._shadow = {
            x: this.position.x,
            y: this.position.y + this._shadowHeight
        }
        this._status = 1
        this.style.background = '#0bb6ff'
    }


    public onMeasure (): void {
        super.onMeasure()
        this.style.height = this.style.height + this._shadowHeight
    }

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        if (context !== null && context !== undefined) {
            context.fillStyle = this._shadowColor
            context.fillRect(this._shadow.x, this._shadow.y, this.style.width, this.style.height)
            context.fillStyle = this.style.background
            if (this._status === 1) {
                context.fillRect(this.position.x, this.position.y, this.style.width, this.style.height)
            } else {
                context.fillRect(this.position.x, this._shadow.y, this.style.width, this.style.height)
            }
        }
    }

    public onMouseUp (event: Event): void {
        super.onMouseUp(event)
        this._status = 1
        this.notify()
    }

    public onMouseDown (event: Event): void {
        super.onMouseDown(event)
        this._status = 0
        this.notify()
    }

    get shadowHeight (): number {
        return this._shadowHeight
    }

    set shadowHeight (value: number) {
        this._shadowHeight = value
    }

    get shadowColor (): string {
        return this._shadowColor
    }

    set shadowColor (value: string) {
        this._shadowColor = value
    }


    public notify (): void {
        this._shadow.x = this.position.x
        this._shadow.y = this.position.y + this._shadowHeight
        super.notify()
    }
}

export default ShadowView
