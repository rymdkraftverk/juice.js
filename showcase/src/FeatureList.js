export default [
  [
    "easeIn", {
      parameters: {
        end: { value: 800, optional: false },
        modifier: { value: 1, optional: true },
        maxSpeed: { value: 10, optional: true },
      }
    }
  ],
  [
    "easeInOut",
    {
      parameters: {
        startValue: { value: 100, optional: false },
        endValue: { value: 600, optional: false },
        duration: { value: 120, optional: false },
        startTime: { value: 0, optional: true }
      }
    }
  ],
  [
    "easeOut", {
      parameters: {
        startValue: { value: 100, optional: false },
        endValue: { value: 800, optional: false },
        duration: { value: 180, optional: false },
      },
    }
  ],
  [
    "linear",
    {
      parameters: {
        startValue: { value: 100, optional: true },
        speed: { value: 3, optional: true },
      }
    }
  ],
  [
    "parabola",
    {
      parameters: {
        duration: { value: 400, optional: false },
        height: { value: 500, optional: false },
        startValue: { value: 0, optional: true },
        startTime: { value: 0, optional: true }
      }
    }
  ],
  [
    "sine",
    {
      parameters: {
        startValue: { value: 100, optional: false },
        endValue: { value: 700, optional: false },
        duration: { value: 180, optional: false }
      }
    }
  ]
];
