const features = [
  {
    name: 'easeIn',
    parameters: {
      duration: { value: 180, optional: false },
      startValue: { value: 100, optional: false },
      endValue: { value: 800, optional: false },
    },
  },
  {
    name: 'easeInOut',
    parameters: {
      duration: { value: 120, optional: false },
      startValue: { value: 100, optional: false },
      endValue: { value: 600, optional: false },
      startTime: { value: 0, optional: true },
    },
  },
  {
    name: 'easeOut',
    parameters: {
      duration: { value: 180, optional: false },
      startValue: { value: 100, optional: false },
      endValue: { value: 800, optional: false },
    },
  },
  {
    name: 'linear',
    parameters: {
      duration: { value: 120, optional: false },
      endValue: { value: 300, optional: false },
      startValue: { value: 100, optional: true },
    },
  },
  {
    name: 'parabola',
    parameters: {
      duration: { value: 400, optional: false },
      height: { value: 500, optional: false },
      startValue: { value: 0, optional: true },
      startTime: { value: 0, optional: true },
    },
  },
  {
    name: 'sine',
    parameters: {
      duration: { value: 180, optional: false },
      startValue: { value: 100, optional: false },
      endValue: { value: 700, optional: false },
    },
  },
]

export default features
