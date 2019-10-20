import Observer from './Observer'

export function Property () {
    return (target: any, propertyName: string) => {
        if (!target.hasOwnProperty('_properties')) {
            target._properties = []
        }
        target._properties.push(propertyName)
    }
}

abstract class AbstractObserver implements Observer {
    // noinspection JSMismatchedCollectionQueryUpdate
    private readonly _properties?: string[]

    protected constructor () {
    }

     public resolve (): void {
        if (this._properties === undefined) {
            return
        }
        for (const key of this._properties) {
             if (this.hasOwnProperty(key)) {
                 const field = Object.getOwnPropertyDescriptor(this, key)
                 if (field === undefined) {
                     continue
                 }
                 if (!field.configurable) {
                     continue
                 }
                 const property = key.replace('_', '')
                 Object.defineProperty(this, property, {
                     get () {
                         return this[key]
                     },
                     set (v) {
                         this.notify()
                         this[key] = v
                     }
                 })
             }
         }
    }

    public initialize (): void {
         this.resolve()
    }

    public abstract notify (): void
}

export default AbstractObserver
