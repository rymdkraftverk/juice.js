# juice.js API

## Juicers

[easeIn](#easeIn)
[easeInOut](#easeInOut)
[easeOut](#easeOut)
[linear](#linear)
[parabola](#parabola)
[sine](#sine)

## Utils

[glueFunctions](#glueFunctions)
[limitLower](#limitLower)
[limitUpper](#limitUpper)
[offsetTime](#offsetTime)

---

## linear
`linear({ startValue, speed }) => time => value`

### parameters

- `startValue`
- `speed`

The animation will start at `startValue` and move `speed` amount of values per update.

---

## sine
`sine({ startValue, endValue, duration }) => time => value`

### parameters

- `startValue`
- `endValue`
- `duration`

The return value will be a number between `startValue` and `endValue`. 

`duration` defines the amount of updates it will take to go from `startValue` to `endValue`

---

## easeInOut

`easeInOut({ startValue, endValue, duration, ?startTime }) => time => value`

### parameters

- `startValue`
- `endValue`
- `duration`
- `startTime` _(optional)_

The return value will be a number between `startValue` and `endValue`. The animation will continue to play when `endValue` is exceeded.

`duration` defines the amount of updates it will take to go from `startValue` to `endValue`

`startTime` is an optional time offset if your counter does not start at 0

---

## parabola

`parabola({ duration, height, ?startValue, ?startTime }) => time => value`

### parameters

- `height`
- `duration` 
- `startValue` _(optional)_
- `startTime` _(optional)_

The maximum point of the parabola will be `height` and `startValue` combined.

`duration` defines the amount of updates / ticks it will take to go from `startValue` until `value` is equal to `startValue` again.

