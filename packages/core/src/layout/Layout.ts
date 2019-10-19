import dispatcher from '../../../engine/src/HydraEventDispatcher'
import Event from '../event/Event'
import View from '../view/View'
import Container from './base/Container'

class Layout extends View implements Container {
    private readonly _children: View []

    constructor () {
        super()
        this._children = []
    }

    public attach (view: View): void {
        this._children.push(view)
    }


    public receive (event: Event): void {
        super.receive(event)
        for (const view of this._children) {
            dispatcher.dispatch(event, view)
        }
    }
}

export default Layout
