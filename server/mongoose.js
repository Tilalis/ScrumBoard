const mongoose = require('mongoose');

const logger = require('./logger');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:scrumboardroot@ds111754.mlab.com:11754/scrumboard', {
  useMongoClient: true
})
.then(function (db) {
  console.log("Connected!");
})
.catch(function (db) {
  console.error("Connection error.")
});

var Schema = mongoose.Schema;

var IterationItemSchema = new Schema({
  name: String,
  description: String,
  storyPoints: Number
});

var IterationSchema = new Schema({
  name: String,
  todo: [IterationItemSchema],
  doing: [IterationItemSchema],
  done: [IterationItemSchema]
});

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  backlog: [IterationItemSchema],
  iterations: [IterationSchema]
});

var ProjectModel = mongoose.model('ProjectModel', ProjectSchema);
var IterationModel = mongoose.model('IterationModel', IterationSchema);
var IterationItemModel = mongoose.model('IterationItemModel', IterationItemSchema);

module.exports = {
  ProjectModel: ProjectModel,
  IterationModel: IterationModel,
  IterationItemModel: IterationItemModel
};
