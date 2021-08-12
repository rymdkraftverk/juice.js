import test from 'ava'
import * as juice from './src'
import { times } from 'lodash/fp'

const duration = 5

test('linear - positive endValue', (t) => {
  const getX = juice.linear({
    endValue: 40,
    duration,
  })
  times((index) => {
    t.is(getX(index), 8 * index)
  }, duration)
})

test('linear - negative endValue', (t) => {
  const getX = juice.linear({
    endValue: -40,
    duration,
  })
  times((index) => {
    const expected = -8 * index
    t.is(getX(index), expected === -0 ? 0 : expected)
  }, duration)
})

test('linear - endValue < startValue', (t) => {
  const startValue = 20
  const getX = juice.linear({
    endValue: 10,
    startValue,
    duration,
  })
  times((index) => {
    const expected = startValue - (2 * index)
    t.is(getX(index), expected)
  }, duration)
})

test('easeOut - positive endValue', (t) => {
  const getX = juice.easeOut({
    endValue: 40,
    duration,
  })
  const expectedValues = [
    0,
    24.07571317786011,
    33.66042723015555,
    37.47617062207922,
    38.99524542739617,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeOut - negative endValue', (t) => {
  const getX = juice.easeOut({
    endValue: -40,
    duration,
  })
  const expectedValues = [
    0,
    -24.07571317786011,
    -33.66042723015555,
    -37.47617062207922,
    -38.99524542739617,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeIn - positive endValue', (t) => {
  const getX = juice.easeIn({
    endValue: 40,
    duration,
  })
  const expectedValues = [
    0,
    1.1016324782757847,
    3.416859073743617,
    8.282614481346688,
    18.508644077311324,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeIn - negative endValue', (t) => {
  const getX = juice.easeIn({
    endValue: -40,
    duration,
  })
  const expectedValues = [
    0,
    -1.1016324782757847,
    -3.416859073743617,
    -8.282614481346688,
    -18.508644077311324,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeIn - endValue < startValue', (t) => {
  const getX = juice.easeIn({
    startValue: 60,
    endValue: 20,
    duration,
  })
  const expectedValues = [
    60 - 0,
    60 - 1.1016324782757847,
    60 - 3.416859073743617,
    60 - 8.282614481346688,
    60 - 18.508644077311324,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('parabola', (t) => {
  const getX = juice.parabola({
    height: 20,
    duration: duration + 1,
  })
  const expectedValues = [
    0,
    11.11111111111111,
    17.77777777777778,
    20,
    17.77777777777778,
    11.11111111111111,
    0,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeInOut - positive endValue', (t) => {
  const getX = juice.easeInOut({
    endValue: 40,
    duration,
  })
  const expectedValues = [0, 15.68, 19.84, 20.16, 24.32]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('easeInOut - negative endValue', (t) => {
  const getX = juice.easeInOut({
    endValue: -40,
    duration,
  })
  const expectedValues = [0, -15.68, -19.84, -20.16, -24.32]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('sine - negative endValue', (t) => {
  const getX = juice.sine({
    endValue: 40,
    duration,
  })
  const expectedValues = [
    20,
    39.02113032590307,
    31.755705045849467,
    8.24429495415054,
    0.9788696740969272,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})

test('sine - positive endValue', (t) => {
  const getX = juice.sine({
    endValue: -40,
    duration,
  })
  const expectedValues = [
    -20,
    -39.02113032590307,
    -31.755705045849467,
    -8.24429495415054,
    -0.9788696740969272,
  ]
  times((index) => {
    t.is(getX(index), expectedValues[index])
  }, expectedValues.length)
})
