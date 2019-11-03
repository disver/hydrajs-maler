import View from '../../core/src/view/View'


class ImageView extends View {
    constructor (image: CanvasImageSource | string) {
        super()
        this._props.resource = image
        this._props.imageX = 0
        this._props.imageY = 0
        this._props.imageWidth = null
        this._props.imageHeight = null
    }

    public render (context: CanvasRenderingContext2D | null | undefined): void {
        super.render(context)
        if (context !== undefined && context !== null) {
            if (this.props.resource instanceof SVGImageElement) {
                context.drawImage(this.props.resource, 0, 0)
            } else if (this.props.resource instanceof Image) {
                if (this.props.resource.complete) {
                    this.renderImage(context, this.props.resource)
                } else {
                    this.props.resource.onload = () => {
                        this.renderImage(context, this.props.resource)
                    }
                }
            } else if (Object.prototype.toString.call(this.props.resource) === '[object String]') {
                const image = new Image()
                image.src = this.props.resource
                this._props.resource = image
                image.onload = () => {
                    this.renderImage(context, image)
                }
            }
        }
    }

    public cropImage (imageX: number, imageY: number, imageWidth: number, imageHeight: number): void {
        this.props.imageX = imageX
        this.props.imageY = imageY
        this.props.imageWidth = imageWidth
        this.props.imageHeight = imageHeight
    }

    protected data (): any {
        return {
            resource: null,
            imageX: null,
            imageY: null,
            imageWidth: null,
            imageHeight: null
        }
    }

    private renderImage (ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
        ctx.drawImage(image, this.props.imageX, this.props.imageY,
            this.props.imageWidth === null ? image.width : this.props.imageWidth,
            this.props.imageHeight === null ? image.height : this.props.imageHeight,
            this._position.x, this._position.y, this._style.width, this._style.height)
    }
}

export default ImageView
