export default [
  [
    "easeIn", {
      parameters: {
        end: { value: 800, optional: false },
        modifier: { value: 1, optional: true },
        maxSpeed: { value: 10, optional: true },
      },
      isRefreshable: true
    }
  ],
  [
    "easeInOut",
    {
      parameters: {
        start: { value: 100, optional: false },
        end: { value: 600, optional: false },
        duration: { value: 120, optional: false },
        startTime: { value: 0, optional: true }
      },
      isRefreshable: true
    }
  ],
  [
    "easeOut", {
      parameters: {
        end: { value: 800, optional: false },
        minSpeed: { value: 0.5, optional: true },
      },
      isRefreshable: true,
    }
  ],
  [
    "linear",
    {
      parameters: {
        start: { value: 100, optional: false },
        speed: { value: 5, optional: true },
      },
      isRefreshable: false
    }
  ],
  [
    "parabola",
    {
      parameters: {
        start: { value: 100, optional: false },
        end: { value: 700, optional: false },
        offset: { value: 0, optional: false },
        modifier: { value: 1, optional: true }
      },
      isRefreshable: true
    }
  ],
  [
    "sine",
    {
      parameters: {
        start: { value: 100, optional: false },
        end: { value: 700, optional: false },
        duration: { value: 180, optional: false }
      },
      isRefreshable: false
    }
  ]
];
