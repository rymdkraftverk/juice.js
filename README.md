# :tropical_drink: juice.js

Adds juice to your animations

<div>
  <img src="https://badgen.net/npm/v/juice.js?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/juice.js?icon=npm" /> -->
</div>
<div>
  <img src="https://badgen.net/bundlephobia/minzip/juice.js" />
</div>
<div>
  <img src="https://badgen.net/github/last-commit/rymdkraftverk/juice.js?icon=github" />
</div>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

For an introduction to the importance of juice, see the following [video](https://youtu.be/Fy0aCDmgnxg)

- **Immutable functions**

  > The same input will always yield the same output

- **Simple API**

  > All functions return a function with the signature `(time) => value`

- **Zero dependencies**

[Full API docs](https://rymdkraftverk.github.io/juice.js/)

---

## How to use

All functions take a configuration object:

```js
const getX = juice.sine({
  startValue: 100,
  endValue: 200,
  duration: 60
})
```

They all return another function with the signature `(time) => value`. 

This can then be called in an update loop:

```js
let time = 0
update(() => {
  entity.x = getX(time)
  time += 1
})
```

The returned value can be used to animate any property of a visual element, such as the position, scale and opacity.

`time` has to be an integer that starts at 0.

## Example code

Example uses `pixi.js` but `juice.js` can be used with any application or game that runs within a loop.

### Example usage with pixi.js

```js
import * as juice from "juice.js";
import * as PIXI from "pixi.js";

// Setup PIXI
const app = new PIXI.Application();
const sprite = new PIXI.Sprite(texture);

// Create a sine function
const getX = juice.sine({
  startValue: 100,
  endValue: 200,
  duration: 30
})

// Call the function every update
let time = 0;
app.ticker.add(() => {
  sprite.x = getX(time)
  time += 1
});
```

Using [level1](https://github.com/rymdkraftverk/level1) behaviors, it can be shortened to:

```js
import * as l1 from 'l1'

l1.repeat((counter) => {
  sprite.x = getX(counter);
})
```

---

## Available functions


---

## Utils / Modifier functions

TODO

---

## Advanced

The docs and examples use `time` as the input value. Though this will probably be the most common use case, any other value can be the input of the functions.

## Develop

### Custom commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder. Supports `--watch` flag.
`yarn clean` | Remove the `dist` folder
`yarn release` | Start the process to release a new version

Use the `showcase` app to test any updates. If the public API is changed, also update the `src/FeatureList` file.
