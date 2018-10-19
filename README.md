# juice.js

For an introduction to the importance of juice, see the following [video](https://youtu.be/Fy0aCDmgnxg)

- Simple API
- Immutable functions
- Zero dependencies

All functions return a function with the signature `(time) => number`

The returned number is commonly used for setting the position of an element, but could be used for anything.

## API

easeInOut = ({
  start, end, duration, startTime = 0,
}) => (time) => number

parabola = ({
  start, end, offset, modifier = 1,
}) => (time) => number

sine = ({ start, end, speed }) => (time) => number

## TODO

easeIn
easeOut
parabolaAngle

- [ ] Setup an examples page, using pixi and level1 to demonstrate all the functions
- [ ] Online editor where you can play around with values
- [ ] Good documentation
- Currying? 