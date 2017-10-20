const mongoose = require('mongoose');
const crypto   = require('crypto');
const logging = require('./logging');
const logger  = new logging.Logger("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:scrumboardroot@ds111754.mlab.com:11754/scrumboard', {
  useMongoClient: true
})
.then(function (db) {
  logger.log("MONGOOSE", "localhost", "Connected.");
})
.catch(function (db) {
  logger.error("MONGOOSE", "localhost", "Connection error.")
});

var Schema = mongoose.Schema;

var IterationItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  storyPoints: {
    type: Number,
    default: 0
  },
}, {
  versionKey: false
});

var IterationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  todo: [IterationItemSchema],
  doing: [IterationItemSchema],
  done: [IterationItemSchema]
}, {
  versionKey: false
});

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  backlog: [IterationItemSchema],
  iterations: [IterationSchema]
}, {
  versionKey: false
});

var Project = mongoose.model('Project', ProjectSchema);
var Iteration = mongoose.model('Iteration', IterationSchema);
var IterationItem = mongoose.model('IterationItem', IterationItemSchema);

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  hash: {
    type: String,
    required: true
  }
});

UserSchema.methods.encrypt = function (password) {
  return crypto.createHash('md5').update(password).digest("hex");
};

UserSchema.methods.check = function (password) {
  return this.encrypt(password) == this.hash;
};

var User = mongoose.model('User', UserSchema);

module.exports = {
  Project: Project,
  Iteration: Iteration,
  IterationItem: IterationItem,
  User: User
};
