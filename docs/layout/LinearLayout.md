### Introduce

This component provides the ability to automatically calculate coordinates horizontally and vertically,
which is very convenient in a simple and simple layout.

### Props
|Name|Type|Value|Describe|
|:-:|:-:|:-:|:-:|
|direction|string|`vertical` or `horizontal`|resolve direction of LinearLayout|

### Usage
```js
import {Hydra, LinearLayout} from '@hydrajs/maler'

// create container (HTMLCanvasElement | HTMLDivElement)
const container = document.createElement('div')
container.style.width = '720px'
container.style.height = '480px'
document.body.appendChild(container)
 
const hydry = new Hydra(container)

const layout = new LinearLayout()
layout.props.direction = 'horizontal'
layout.style.width = 720
layout.style.height = 480
layout.style.borderColor = 'black'
layout.style.borderWeight = 3

// render view here
hydry
    .attach(layout)
    .render()
```

### Method

#### attach(view: View)
