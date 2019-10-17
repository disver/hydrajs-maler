interface Drawable {
    /**
     * add
     * @param name event name to listen
     * @param handler handle when event appear
     */
    addEventListener (name: string, handler: () => void): any

    render (context: CanvasRenderingContext2D | null | undefined): void
}

export default Drawable
