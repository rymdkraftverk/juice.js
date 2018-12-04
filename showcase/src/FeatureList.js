export default [
  [
    "sine",
    {
      parameters: {
        start: 100,
        end: 700,
        duration: 180
      },
      isRefreshable: false
    }
  ],
  [
    "easeInOut",
    {
      parameters: {
        start: 100,
        end: 600,
        duration: 120
      },
      isRefreshable: true
    }
  ],
  [
    "parabola",
    {
      parameters: {
        start: 100,
        end: 700,
        offset: 0,
        modifier: 1
      },
      isRefreshable: true
    }
  ]
];
