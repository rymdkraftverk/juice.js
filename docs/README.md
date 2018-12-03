# juice.js API

All functions return another function with the signature `(time) => value`

## sine

### parameters

easeInOut = ({
start, end, duration, startTime = 0,
}) => (time) => number

parabola = ({
start, end, offset, modifier = 1,
}) => (time) => number

sine = ({ start, end, speed }) => (time) => number
