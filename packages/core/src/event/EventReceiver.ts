import Event from './Event'

interface EventReceiver {
    receive (event: Event): void
    trigger (event: Event): boolean
}
export default EventReceiver
