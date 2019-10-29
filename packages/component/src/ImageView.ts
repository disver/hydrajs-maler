import View from '../../core/src/view/View'


class ImageView extends View {
    constructor (image: CanvasImageSource | string) {
        super()
        this._props.resource = image
    }



    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        this.fetch(context, ctx => {
            if (this.props.resource instanceof SVGImageElement) {
                ctx.drawImage(this.props.resource, 0, 0)
            } else if (this.props.resource instanceof Image) {
                if (this.props.resource.complete) {
                    this.renderImage(ctx, this.props.resource)
                } else {
                    this.props.resource.onload = () => {
                        this.renderImage(ctx, this.props.resource)
                    }
                }
            } else if (Object.prototype.toString.call(this.props.resource) === '[object String]') {
                const image = new Image()
                image.src = this.props.resource
                this._props.resource = image
                image.onload = () => {
                    this.renderImage(ctx, image)
                }
            }
        })
    }

    protected data (): any {
        return {
            resource: null
        }
    }

    private renderImage (ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
        ctx.drawImage(image, 0, 0, image.width, image.height,
            this._position.x, this._position.y, this._style.width, this._style.height)
    }
}

export default ImageView
