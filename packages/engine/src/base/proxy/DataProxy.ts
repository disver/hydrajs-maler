abstract class DataProxy {
    protected readonly _proxies?: any

    protected constructor () {
        this._proxies = {}
    }

    public abstract notify (): void
}

export default DataProxy
