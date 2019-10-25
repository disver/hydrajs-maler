import Event from '../../event/Event'

interface Drawable {
    /**
     * add event name to listen
     * and handle when event appear
     */
    addEventListener (name: string, handler: (event: Event) => void): void

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
