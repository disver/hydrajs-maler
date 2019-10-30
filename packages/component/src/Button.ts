import Event from '../../core/src/event/Event'
import ShadowView from './ShadowView'

class Button extends ShadowView {
    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            if (this.props.align === 'center') {
                ctx.textAlign = this.props.align
            }
            if (this.props.align === 'left') {
                ctx.textAlign = 'end'
            }
            if (this.props.align === 'right') {
                ctx.textAlign = 'start'
            }
            ctx.fillStyle = this.style.fontColor
            ctx.fillText(this.props.name, this.position.x + this.style.width / 2,
                this.position.y + this.style.fontSize / 4 + this.style.height / 2,
                this.style.width)
        })
    }


    public receive (event: Event): boolean {
        super.receive(event)
        return true
    }

    protected data (): any {
        return {
            name: 'Button',
            align: 'center'
        }
    }
}

export default Button
