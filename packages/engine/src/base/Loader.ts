import Resource from './Resource'

interface Loader<T> {
    resources (resources: Array<Resource<T>>): Loader<T>
    progress (callback: (resource: Resource<T>) => void): Loader<T>
    complete (call: (result: {
        success: number,
        failed: number,
        total: number
    }) => void): Loader<T>
}
export default Loader
