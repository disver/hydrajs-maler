import Event from '../../../core/src/event/Event'
import View from '../../../core/src/view/View'

interface EventDispatcher {
    views: View []
    dispatch (event: Event, view: View): boolean
    with (canvas: HTMLCanvasElement | null | undefined): void
    ergodic (views: View [], call: (view: View) => boolean): void
}
export default EventDispatcher
