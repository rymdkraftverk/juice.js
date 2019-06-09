export default [
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
