var mongoose = ('mongoose');

mongoose.connect('mongodb://root:scrumboardroot@ds111754.mlab.com:11754/scrumboard');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Project = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  backlog: {
    type: [{
      name: String,
      description: String,
      storyPoints: Number
    }],
    required: true
  },
  iterations: {
    type: [{
      name: String,
      todo: [{
        name: String,
        description: String,
        storyPoints: Number
      }],
      doing: [{
        name: String,
        description: String,
        storyPoints: Number
      }],
      done: [{
        name: String,
        description: String,
        storyPoints: Number
      }]
    }],
    required: true
  }
});

var ProjectModel = mongoose.model('ProjectModel', ProjectModel);

module.exports.ProjectModel = ProjectModel;
