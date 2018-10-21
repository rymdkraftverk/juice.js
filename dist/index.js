"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sine = exports.parabolaAngle = exports.parabola = exports.linear = exports.easeOut = exports.easeInOut = exports.easeIn = void 0;

var getNormalizer = function getNormalizer(x1, x2) {
  return 4 / (Math.pow(x1, 2) + Math.pow(x2, 2));
};

var easeIn = function easeIn(_ref) {
  var end = _ref.end,
      _ref$modifier = _ref.modifier,
      modifier = _ref$modifier === void 0 ? 1 : _ref$modifier,
      _ref$maxSpeed = _ref.maxSpeed,
      maxSpeed = _ref$maxSpeed === void 0 ? 10 : _ref$maxSpeed;
  return function (x) {
    return Math.min(modifier / Math.abs(end - x), maxSpeed);
  };
};

exports.easeIn = easeIn;

var easeInOut = function easeInOut(_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      duration = _ref2.duration,
      _ref2$startTime = _ref2.startTime,
      startTime = _ref2$startTime === void 0 ? 0 : _ref2$startTime;

  if (duration <= 0) {
    console.error('easeInOut: duration has to be positive');
  }

  var endTime = startTime + duration;
  var speed = 4 * ((start - end) / Math.pow(startTime - endTime, 3));
  var positionOffset = (end + start) / 2;
  var timeOffset = (endTime + startTime) / 2;
  return function (t) {
    return speed * Math.pow(t - timeOffset, 3) + positionOffset;
  };
};

exports.easeInOut = easeInOut;

var easeOut = function easeOut(_ref3) {
  var end = _ref3.end,
      _ref3$minSpeed = _ref3.minSpeed,
      minSpeed = _ref3$minSpeed === void 0 ? 0.5 : _ref3$minSpeed;
  return function (x) {
    return Math.max(Math.abs(end - x) * 0.1, minSpeed);
  };
};

exports.easeOut = easeOut;

var linear = function linear(_ref4) {
  var start = _ref4.start,
      _ref4$speed = _ref4.speed,
      speed = _ref4$speed === void 0 ? 1 : _ref4$speed;
  return function (t) {
    return start + t * speed;
  };
};

exports.linear = linear;

var parabola = function parabola(_ref5) {
  var start = _ref5.start,
      end = _ref5.end,
      offset = _ref5.offset,
      _ref5$modifier = _ref5.modifier,
      modifier = _ref5$modifier === void 0 ? 1 : _ref5$modifier;
  return function (t) {
    var normalizer = getNormalizer(start, end);
    return offset + Math.abs(start - end) * modifier * (normalizer * (t - start) * (t - end));
  };
};

exports.parabola = parabola;

var parabolaAngle = function parabolaAngle(_ref6) {
  var start = _ref6.start,
      end = _ref6.end,
      _ref6$modifier = _ref6.modifier,
      modifier = _ref6$modifier === void 0 ? 1 : _ref6$modifier;
  return function (x) {
    var normalizer = getNormalizer(start, end);
    return Math.atan(Math.abs(start - end) * modifier * normalizer * (2 * x - start - end));
  };
};

exports.parabolaAngle = parabolaAngle;

var sine = function sine(_ref7) {
  var start = _ref7.start,
      end = _ref7.end,
      speed = _ref7.speed;
  return function (t) {
    var middle = (start + end) / 2;
    return middle + (middle - start) * Math.sin(t * Math.PI * 2 / speed);
  };
};

exports.sine = sine;