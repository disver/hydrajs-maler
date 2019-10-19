import Event from '../../../core/src/event/Event'
import View from '../../../core/src/view/View'

interface EventDispatcher {
    dispatch (event: Event, view: View): void
}
export default EventDispatcher
