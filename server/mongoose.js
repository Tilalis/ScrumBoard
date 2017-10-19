const mongoose = require('mongoose');

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
  name: String,
  sha256: String
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  Project: Project,
  Iteration: Iteration,
  IterationItem: IterationItem,
};
