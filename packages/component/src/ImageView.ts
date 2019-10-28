import View from '../../core/src/view/View'


class ImageView extends View {
    private readonly image: CanvasImageSource

    constructor (image: CanvasImageSource) {
        super()
        this.image = image
    }

    public render (context: CanvasRenderingContext2D | null | undefined) {
        if (context instanceof CanvasRenderingContext2D) {
            this.fillStyle(this.style, context)
            if (this.image instanceof SVGImageElement) {
                context.drawImage(this.image, 0, 0)
            } else {
                context.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                    this._position.x, this._position.y, this._style.width, this._style.height)
            }
        }
    }
}

export default ImageView
