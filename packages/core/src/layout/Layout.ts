import View from '../view/View'

class Layout extends View {
    public foo () {
        const a = 1
        const b = {
            a
        }
        for (let i = 0; i < 8000; i++) {
            console.log(123)
        }
    }
}

export default Layout
