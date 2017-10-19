const util = require('util');

const colors = {
  DEFAULT: "\x1b[0m",
  BLACK: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGNETA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m"
}

const levels = {
  ERROR: {
    value: 0,
    text: "ERROR"
  },
  INFO: {
    value: 1,
    text: "INFO"
  },
  LOG: {
    value: 2,
    text: "LOG"
  }
}

var currentLevel = levels.LOG;

function setLevel(level) {
  currentLevel = level;
}

function _log(color, level, tag, at, message, out) {
  if (level.value <= currentLevel.value) {
    out(color + ("[" + level.text + " " + tag +  "@" + at + "]: ").padEnd(30) + message + colors.DEFAULT);
  }
}

function info(tag, at, message) {
  _log(colors.CYAN, levels.INFO, tag, at, message, console.info);
}

function error(tag, at, message) {
  _log(colors.RED, levels.ERROR, tag, at, message, console.error);
}

function log(tag, at, message) {
  _log(colors.YELLOW, levels.LOG, tag, at, message, console.log);
}

module.exports = {
  info: info,
  error: error,
  log: log,
  setLevel: setLevel,
  levels: levels
}
