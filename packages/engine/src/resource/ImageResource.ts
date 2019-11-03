import Resource from '../base/Resource'

class ImageResource extends Resource<HTMLImageElement>{

    constructor (resource: string | HTMLImageElement) {
        super()
        if (typeof resource === 'string') {
            const image = new Image()
            image.src = resource
            this.target = image
        } else {
            if (resource !== null) {
                this.target = resource
            }
        }
    }

    public getName (): string {
        if (this.target === null) {
            return ''
        }
        return this.target.src
    }
}
export default ImageResource
