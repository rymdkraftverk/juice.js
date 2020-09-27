const features = [
  {
    name: 'sine',
    loop: true,
    parameters: {
      duration: { value: 300 },
      startValue: { value: 100 },
      endValue: { value: 700 },
    },
  },
  {
    name: 'easeIn',
    parameters: {
      duration: { value: 120 },
      startValue: { value: 100 },
      endValue: { value: 700 },
    },
  },
  {
    name: 'easeOut',
    parameters: {
      duration: { value: 120 },
      startValue: { value: 100 },
      endValue: { value: 700 },
    },
  },
  {
    name: 'easeInOut',
    parameters: {
      duration: { value: 120 },
      startValue: { value: 100 },
      endValue: { value: 700 },
      startTime: { value: 0 },
    },
  },
  {
    name: 'linear',
    parameters: {
      duration: { value: 120 },
      endValue: { value: 700 },
      startValue: { value: 100 },
    },
  },
  {
    name: 'parabola',
    parameters: {
      duration: { value: 180 },
      height: { value: 600 },
      startValue: { value: 100 },
      startTime: { value: 0 },
    },
  },
]

export default features
