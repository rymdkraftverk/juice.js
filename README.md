# :tropical_drink: juice.js

> Adds juice to your animations

<div>
  <img src="https://badgen.net/npm/v/juice.js?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/juice.js?icon=npm" /> -->
  <img src="https://badgen.net/bundlephobia/minzip/juice.js" />
  <img src="https://badgen.net/github/last-commit/rymdkraftverk/juice.js?icon=github" />
</div>

---

For an introduction to the importance of juice, see the following [video](https://youtu.be/Fy0aCDmgnxg)

- **Immutable functions**

  > The same input will always yield the same output

- **Simple API**

  > All functions return a function with the signature `(time) => value`

- **Zero dependencies**

---

## How to use

All functions take a configuration object:

```js
const getX = juice.sine({
  startValue: 100,
  endValue: 200,
  duration: 60,
})
```

They all return another function with the signature `(time) => value`.

This can then be called in an update loop:

```js
onUpdate((time) => {
  sprite.x = getX(time)
})
```

The returned value can be used to animate any property of a visual element, such as the `position`, `scale` or `opacity`.

_Note: `time` has to be an integer that starts at 0._

---

## Example usage

Example uses `pixi.js` but `juice.js` can be used with any application or game that runs within a loop.

### Example usage with pixi.js

```js
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'

// Setup PIXI
const app = new PIXI.Application()
const sprite = new PIXI.Sprite(texture)

// Create a sine function
const getX = juice.sine({
  startValue: 100,
  endValue: 200,
  duration: 30,
})

// Call the function every update
let time = 0
app.ticker.add(() => {
  sprite.x = getX(time)
  time += 1
})
```

---

## Available functions

_Note: `onUpdate` is a mock update function. You should use a real implementation of this, such as `pixi.js` `ticker`._

### easeIn

Starts slow. Velocity increases over time.

```js
import * as juice from 'juice.js'

const getX = juice.easeIn({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

<!-- TODO: Add gif here -->

### easeOut

Starts fast. Velocity decreases over time.

```js
import * as juice from 'juice.js'

const getX = juice.sine({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

<!-- TODO: Add gif here -->

### parabola

_Note: `height` is added to the `startValue`_

```js
import * as juice from 'juice.js'

const getX = juice.parabola({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

<!-- TODO: Add gif here -->

### sine

```js
import * as juice from 'juice.js'

const getX = juice.sine({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

<!-- TODO: Add gif here -->

### easeInOut

```js
import * as juice from 'juice.js'

const getX = juice.easeInOut({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

### linear

```js
import * as juice from 'juice.js'

const getX = juice.linear({
  endValue: 100,
  duration: 60,
})

onUpdate((time) => {
  sprite.x = getX(time)
})
```

<!-- TODO: Add gif here -->

<!-- ## Examples with different game loops

Maybe...

### Mainloop.js

### Pixi.js -->

---

## Tips

- Juice works best when it doesn't interrupt what the player is trying to do! For example, the player should not have to wait for the animation to finish before they can take the next action.

- This library works very well with [level1](https://github.com/rymdkraftverk/level1)

Example code:

```js
import * as l1 from 'l1'
import * as juice from 'juice.js'

const getX = juice.linear({
  endValue: 100,
  duration: 60,
})

l1.every((counter) => {
  sprite.x = getX(counter)
})
```

## Develop

### Custom commands

| Command        | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `yarn build`   | Generate files in the `dist` folder. Supports `--watch` flag. |
| `yarn clean`   | Remove the `dist` folder                                      |
| `yarn release` | Start the process to release a new version                    |

Use the `testApp` app to test any updates. If the public API is changed, also update the `src/FeatureList` file.
