const getNormalizer = (x1, x2) => (4 / ((x1 ** 2) + (x2 ** 2)))

export const easeInOut = ({
  start, end, duration, startTime = 0,
}) => {
  if (duration <= 0) {
    error('easeInOut: duration has to be positive')
  }
  const endTime = startTime + duration
  const speed = 4 * ((start - end) / ((startTime - endTime) ** 3))
  const positionOffset = (end + start) / 2
  const timeOffset = (endTime + startTime) / 2

  return t => (speed * ((t - timeOffset) ** 3)) + positionOffset
}

export const parabola = ({
  start, end, offset, modifier = 1,
}) => (t) => {
  const normalizer = getNormalizer(start, end)
  return offset + ((Math.abs(start - end) * modifier) * (normalizer * (t - start) * (t - end)))
}

export const sine = ({
  start, end, speed,
}) => (t) => {
  const middle = ((start + end) / 2)
  return middle + ((middle - start) * Math.sin((t * Math.PI * 2) / speed))
}
