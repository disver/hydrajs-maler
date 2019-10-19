interface Observer {
    handler: (() => void) | null
    onChanged (h: () => void): void
}

export default Observer
