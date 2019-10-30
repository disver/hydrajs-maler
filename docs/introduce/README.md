[![Build Status](https://www.travis-ci.org/disver/hydrajs-maler.svg?branch=master)](https://www.travis-ci.org/disver/hydrajs-maler)


***

## Introduction

Hydra is a JavaScript library for working with and building Canvas views.

In the past few months, our team built a configuration diagram using Javascript due to the needs of the work.
We made a lot of comparisons in many libraries, and finally settled the program using the game engine (`Cocos2dx`).

   The reason is simple, because Cocos has a lot of out-of-the-box visual editing tools that will bring us great efficiency.
After completing the task, we also made some reflections. Obviously, it is unreasonable to use a game engine to build such a page.
   This way will bring a lot of inconvenience in subsequent maintenance, one of which is code separation (the visual tool we use is `Cocos Creator`, which needs to reference the code after building).
At the same time, the form of iframe embedding also makes many elements of the page uncontrollable.

   After the free time, we decided to develop a Canvas view framework in the team meeting, which can be used to conveniently build the view, so Hydra.js was born.

## Installation

We will release the latest version of Hydra to `npm` on a regular basis.
If you need to get the source code, please go to our [Github](https://github.com/disver/hydrajs-maler) repository to download.  

Usually you can install it with the following command (requires a Node environment)

Firstly, initialization project  

```
npm init
```

Then, to install Hydra.js to the current project.  

```
npm install @hydrajs/maler --save
```

Finally, introduced into the html file to start using  

```js
import {Hydra, Button} from '@hydrajs/maler'

// create container (HTMLCanvasElement | HTMLDivElement)
const container = document.createElement('div')
container.style.width = '720px'
container.style.height = '480px'
document.body.appendChild(container)

const hydry = new Hydra(container)

const button = new Button()
button.props.name = 'Hello'
button.style.width = 100
button.style.height = 30

// render view here
hydry
    .attach(button)
    .render()
```

Now just let your imagination bloom now!
