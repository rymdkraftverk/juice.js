# juice.js :tropical_drink:

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

For an introduction to the importance of juice, see the following [video](https://youtu.be/Fy0aCDmgnxg)

- Immutable functions

  > The same input will always yield the same output

- Simple API

  > All functions return a function with the signature `(time) => value`

- Zero dependencies

The returned value can be used to animate any property of a visual element, such as the position, scale and opacity.

## Example code

## API

easeInOut = ({
start, end, duration, startTime = 0,
}) => (time) => number

parabola = ({
start, end, offset, modifier = 1,
}) => (time) => number

sine = ({ start, end, speed }) => (time) => number

### General usage with a fictitious rendering library

```js
import * as juice from "juice.js";

const getX = juice.sine({
  start: 100,
  end: 200,
  speed: 30
});

// Any visual object
const gameObject = new GameObject();

// Any loop that runs at a set interval
let tick = 0;
onUpdate(() => {
  gameObject.x = getX(tick);
  tick += 1;
});
```

### Usage with pixi.js

```js
import * as juice from "juice.js";
import * as PIXI from "pixi.js";

const getX = juice.sine({
  start: 100,
  end: 200,
  speed: 30
});

const app = new PIXI.Application();

document.body.appendChild(app);

const sprite = new PIXI.Sprite(texture);

let tick = 0;

app.ticker.add(() => {
  sprite.x = getX(tick);
  tick += 1;
});
```

## TODO

easeIn
easeOut
parabolaAngle
linear

- [ ] Good documentation
- Currying?
- Good error messages

Rename speed to duration?
