const getNormalizer = (x1: number, x2: number) =>
  4 / (2 * x1 * x2 - x1 ** 2 - x2 ** 2)

type juiceFn = (time: number) => number

type EaseInOutOptions = {
  readonly endValue: number
  readonly duration: number
  readonly startValue?: number
  readonly startTime?: number
}

export const easeInOut = ({
  endValue,
  duration,
  startValue = 0,
  startTime = 0,
}: EaseInOutOptions): juiceFn => {
  if (duration <= 0) {
    console.error('easeInOut: duration has to be positive')
  }

  const endTime = startTime + duration
  const speed = 4 * ((startValue - endValue) / (startTime - endTime) ** 3)
  const positionOffset = (endValue + startValue) / 2
  const timeOffset = (endTime + startTime) / 2

  return (t) => speed * (t - timeOffset) ** 3 + positionOffset
}

type EaseInOptions = {
  readonly endValue: number
  readonly duration: number
  readonly startValue?: number
}

export const easeIn = ({
  endValue,
  duration,
  startValue = 0,
}: EaseInOptions): juiceFn => {
  const speedParameter =
    Math.log(1 - startValue + Math.abs(endValue)) / duration

  const modifier = endValue < startValue ? -1 : 1

  return (t) => {
    return (startValue - 1 + Math.E ** (t * speedParameter)) * modifier
  }
}

type EaseOutOptions = {
  readonly endValue: number
  readonly duration: number
  readonly startValue?: number
}

export const easeOut = ({
  endValue,
  duration,
  startValue = 0,
}: EaseOutOptions): juiceFn => {
  const functionHeight = startValue - endValue
  const speedParameter = Math.log(1 / 100) / duration

  return (t) => endValue + functionHeight * Math.E ** (t * speedParameter)
}

type LinearOptions = {
  readonly endValue: number
  readonly duration: number
  readonly startValue?: number
}

export const linear = ({
  endValue,
  duration,
  startValue = 0,
}: LinearOptions): juiceFn => {
  const velocity = (endValue - startValue) / duration
  return (t) => t * velocity
}

type ParabolaOptions = {
  readonly height: number
  readonly duration: number
  readonly startValue?: number
  readonly startTime?: number
}

export const parabola = ({
  duration,
  height,
  startValue = 0,
  startTime = 0,
}: ParabolaOptions): juiceFn => (t) => {
  const endTime = startTime + duration
  const normalizer = getNormalizer(startTime, endTime)
  return startValue + height * normalizer * (t - startTime) * (t - endTime)
}

type SineOptions = {
  readonly endValue: number
  readonly duration: number
  readonly startValue?: number
}

export const sine = ({
  endValue,
  duration,
  startValue = 0,
}: SineOptions): juiceFn => (t) => {
  const middle = (startValue + endValue) / 2
  return middle + (middle - startValue) * Math.sin((t * Math.PI * 2) / duration)
}
