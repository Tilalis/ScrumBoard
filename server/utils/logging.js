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

function Logger(name) {
  this._currentLevel = levels.LOG;
  this.name = name;

  this._log = (color, level, tag, at, message, out) => {
    if (level.value <= this._currentLevel.value) {
      out(
        color                                                         +
        ("[" + level.text + " " + tag +  "@" + at + "]: ").padEnd(30) +
        message                                                       +
        colors.DEFAULT
      );
    }
  }

  this.log   = (tag, at, message) => this._log(colors.YELLOW, levels.LOG, tag, at, message, console.log);
  this.info  = (tag, at, message) => this._log(colors.CYAN, levels.INFO, tag, at, message, console.info);
  this.error = (tag, at, message) => this._log(colors.RED, levels.ERROR, tag, at, message, console.error);

  this.setLevel = (level) => {
    this._currentLevel = level;
  };

}

Object.assign(Logger, levels);
module.exports = {
  Logger: Logger
}
