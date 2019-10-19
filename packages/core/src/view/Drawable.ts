interface Drawable {
    /**
     * add event name to listen
     * and handle when event appear
     */
    addEventListener (name: string, handler: () => void): void

    /**
     *  render view
     */
    render (context: CanvasRenderingContext2D | null | undefined): void
}

export default Drawable
