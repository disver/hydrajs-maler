import Event from '../../../core/src/event/Event'
import View from '../../../core/src/view/View'

interface EventDispatcher {
    views: View []
    dispatch (event: Event, view: View): void
    with (canvas: HTMLCanvasElement | null | undefined): void
}
export default EventDispatcher
