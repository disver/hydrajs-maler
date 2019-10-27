import Event from '../../event/Event'
import Style from './Style'

interface Drawable {
    /**
     * add event name to listen
     * and handle when event appear
     */
    addEventListener (name: string, handler: (event: Event) => void): void

    fillStyle (style: Style | null, context: CanvasRenderingContext2D | null | undefined): void

    /**
     *  render view
     */
    render (context: CanvasRenderingContext2D | null | undefined): void

    onMove (event: Event): void

    onMouseDown (event: Event): void

    onMouseUp (event: Event): void

    onMouseLeave (event: Event): void

    onMouseEnter (event: Event): void

    onMeasure (): void

}

export default Drawable
