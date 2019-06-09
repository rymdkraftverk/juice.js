const getNormalizer = (x1, x2) => 4 / ((2 * x1 * x2) - (x1 ** 2) - (x2 ** 2));

export const easeIn = ({
  end,
  modifier = 1,
  maxSpeed = 10,
}) => x => Math.min(modifier / Math.abs((end - x)), maxSpeed);

export const easeInOut = ({
  start, end, duration, startTime = 0,
}) => {
  if (duration <= 0) {
    console.error('easeInOut: duration has to be positive');
  }
  const endTime = startTime + duration;
  const speed = 4 * ((start - end) / ((startTime - endTime) ** 3));
  const positionOffset = (end + start) / 2;
  const timeOffset = (endTime + startTime) / 2;

  return t => (speed * ((t - timeOffset) ** 3)) + positionOffset;
};

export const easeOut = ({
  startValue,
  endValue,
  duration,
}) => {
  const functionHeight = startValue - endValue;
  const speedParameter = Math.log(1 / 100) / duration;

  return t => endValue + functionHeight * Math.E ** (t * speedParameter);
}

export const linear = ({
  offset = 0,
  speed = 1,
}) => t => offset + (t * speed);

export const parabola = ({
  duration, height, offset = 0, startTime = 0,
}) => (t) => {
  const endTime = startTime + duration;
  const normalizer = getNormalizer(startTime, endTime);
  return offset + (height * normalizer * (t - startTime) * (t - endTime));
};

export const parabolaAngle = ({
  start,
  end,
  modifier = 1,
}) => (x) => {
  const normalizer = getNormalizer(start, end);
  return Math.atan((Math.abs(start - end) * modifier) * normalizer * ((2 * x) - start - end));
};

// TODO: where to start in the animation: phase shift
export const sine = ({
  start, end, duration,
}) => (t) => {
  const middle = ((start + end) / 2);
  return middle + ((middle - start) * Math.sin((t * Math.PI * 2) / duration));
};
