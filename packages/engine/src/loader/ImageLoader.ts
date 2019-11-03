import Loader from '../base/Loader'
import Resource from '../base/Resource'

class ImageLoader implements Loader<HTMLImageElement>{
    private _images: Array<Resource<HTMLImageElement>> = []
    private _complete: ((result: {
        success: number,
        failed: number,
        total: number
    }) => void) | null = null

    private _progress: ((resource: Resource<HTMLImageElement>) => void) | null = null

    private _result: {
        success: number,
        failed: number,
        total: number
    } = {
        success: 0,
        failed: 0,
        total: 0
    }

    public complete (call: (result: { success: number;
    failed: number; total: number }) => void): Loader<HTMLImageElement> {
        this._complete = call
        return this
    }

    public progress (callback: (resource: Resource<HTMLImageElement>) => void): Loader<HTMLImageElement> {
        this._progress = callback
        return this
    }

    public resources (resources: Array<Resource<HTMLImageElement>>): Loader<HTMLImageElement> {
        this._images = resources
        this._result.total = this._images.length
        this.loadImages(this._images)
        return this
    }


    private loadImages (_images: Array<Resource<HTMLImageElement>>) {
        for (const image of _images) {
            if (image.target !== null) {
                image.target.onload = () => {
                    this._result.success += 1
                    this._progress && this._progress(image)
                    if (this._result.success + this._result.failed === this._result.total)  {
                        this._complete && this._complete(this._result)
                    }
                }
                image.target.onerror = () => {
                    this._result.failed += 1
                    if (this._result.success + this._result.failed === this._result.total)  {
                        this._complete && this._complete(this._result)
                    }
                }
            }
        }
    }
}
export default ImageLoader
