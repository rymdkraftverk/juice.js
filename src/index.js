const getNormalizer = (x1, x2) => 4 / ((2 * x1 * x2) - (x1 ** 2) - (x2 ** 2));

export const easeInOut = ({
  startValue, endValue, duration, startTime = 0,
}) => {
  if (duration <= 0) {
    console.error('easeInOut: duration has to be positive');
  }
  const endTime = startTime + duration;
  const speed = 4 * ((startValue - endValue) / ((startTime - endTime) ** 3));
  const positionOffset = (endValue + startValue) / 2;
  const timeOffset = (endTime + startTime) / 2;

  return t => (speed * ((t - timeOffset) ** 3)) + positionOffset;
};

export const easeIn = ({
  startValue,
  endValue,
  duration,
}) => {
  const speedParameter = Math.log(1 - startValue + endValue) / duration;

  return t => (startValue - 1) + (Math.E ** (t * speedParameter));
};

export const easeOut = ({
  startValue,
  endValue,
  duration,
}) => {
  const functionHeight = startValue - endValue;
  const speedParameter = Math.log(1 / 100) / duration;

  return t => endValue + functionHeight * (Math.E ** (t * speedParameter));
};

export const linear = ({
  startValue = 0,
  speed = 1,
}) => t => startValue + (t * speed);

export const parabola = ({
  duration, height, startValue = 0, startTime = 0,
}) => (t) => {
  const endTime = startTime + duration;
  const normalizer = getNormalizer(startTime, endTime);
  return startValue + (height * normalizer * (t - startTime) * (t - endTime));
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
  startValue, endValue, duration,
}) => (t) => {
  const middle = ((startValue + endValue) / 2);
  return middle + ((middle - startValue) * Math.sin((t * Math.PI * 2) / duration));
};

// util functions

export const offsetTime = offset => f => t => f(t - offset);

export const limitLower = limit => f => t => Math.max(f(t), limit);

export const limitUpper = limit => f => t => Math.min(f(t), limit);

export const glueFunctions = limit => f => g => t => (t < limit
  ? f(t)
  : g(t));
