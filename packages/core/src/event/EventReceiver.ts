import Event from './Event'

interface EventReceiver {
    receive (event: Event): boolean
    trigger (event: Event): boolean
}
export default EventReceiver
