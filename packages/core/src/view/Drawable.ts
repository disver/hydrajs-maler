import Event from '../event/Event'

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
}

export default Drawable
