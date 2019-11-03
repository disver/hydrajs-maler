abstract class Resource<T> {
    private _name: string = ''
    private _target: T | null = null

    protected constructor () {
        this._name = this.getName()
    }

    public abstract getName (): string

    get target (): T | null {
        return this._target
    }

    set target (value: T | null) {
        this._target = value
    }

    get name (): string {
        return this._name
    }

    set name (value: string) {
        this._name = value
    }
}
export default Resource
