# juice.js :tropical_drink:

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

For an introduction to the importance of juice, see the following [video](https://youtu.be/Fy0aCDmgnxg)

- **Immutable functions**

  > The same input will always yield the same output

- **Simple API**

  > All functions return a function with the signature `(time) => value`

- **Zero dependencies**

[Full API docs](https://rymdkraftverk.github.io/juice.js/)

## How to use

All functions take a configuration object:

```js
const getX = juice.sine({
  start: 100,
  end: 200,
  duration: 60
})
```

They all return another function with the signature `(time) => value`. 

This can then be called in an update loop:

```js
update((time) => {
  const x = getX(time)
})
```

The returned value can be used to animate any property of a visual element, such as the position, scale and opacity.

All functions expect that `time` is an integer that starts at 0.

## Example code

Example uses `pixi.js` but `juice.js` can be used with any application or game that runs within a loop.

### Example usage with pixi.js

```js
import * as juice from "juice.js";
import * as PIXI from "pixi.js";

// Setup PIXI
const app = new PIXI.Application();
document.body.appendChild(app);
const sprite = new PIXI.Sprite(texture);

// Create a sine function
const getX = juice.sine({
  start: 100,
  end: 200,
  duration: 30
});

// Call the function every tick
let tick = 0;
app.ticker.add(() => {
  sprite.x = getX(tick);
  tick += 1;
});
```

## Develop

### Custom commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder. Supports `--watch` flag.
`yarn clean` | Remove the `dist` folder
`yarn release` | Start the process to release a new version

Use the `showcase` app to test any updates. If the public API is changed, also update the `src/FeatureList` file.

## TODO

easeIn
easeOut
parabolaAngle
linear

- [ ] Good documentation
- Currying?
- Good error messages
