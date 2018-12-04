# juice.js API

[sine](#sine)
[parabola](#parabola)
[easeInOut](#easeInOut)

## sine
`({ start, end, duration }) => time => value`

### parameters

- `start`
- `end`
- `duration`

The return value will be a number between `start` and `end`. 

`duration` defines the amount of updates / ticks it will take to go from `start` to `end`

## easeInOut

`({ start, end, speed, ?startTime }) => time => value`

### parameters

- `start`
- `end`
- `duration`
- `startTime` (optional)

The return value will be a number between `start` and `end`. The animation will continue to play if `end` is exceeded

`duration` defines the amount of updates / ticks it will take to go from `start` to `end`

`startTime` is an optional time offset if your counter does not start at 0

## parabola

`({ start, end, offset, modifier = 1 }) => time => value`
