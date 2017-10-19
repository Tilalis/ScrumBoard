const express    = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('./mongoose');
const logger     = require('./logger');

logger.setLevel(logger.levels.LOG);

var app = express();

const status = {
  ERROR: "ERROR",
  OK: "OK",
  NOTFOUND: "NOT FOUND"
}

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('I AM ALIVE!');
});

app.get('/api/projects', function(req, res) {
  return mongoose.ProjectModel.find(function (err, projects) {
    if (!err) {
      logger.info(req.method, req.path, "Successfully send projects.");
      return res.send(projects);
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      return res.send({status: status.ERROR});
    }
  })
});

app.get('/api/projects/:id', function (req, res) {
  return mongoose.ProjectModel.findById(req.params.id, function (err, project) {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({status: status.NOTFOUND});
      } else {
        logger.info(req.method, req.path, "Successfully send project.");
        return res.send(project);
      }
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      return res.send({status: status.ERROR});
    }
  })
});

app.post('/api/projects', function(req, res) {
  var project = new mongoose.ProjectModel(req.body);

  project.save(function (err) {
    if (!err) {
      logger.info(req.method, req.path, "Added project.");
      res.send({status: status.OK});
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      res.send({status: status.ERROR});
    }
  })
});

app.put('/api/projects/:id', function (req, res) {
  return mongoose.ProjectModel.findById(req.params.id, function (err, project) {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({status: status.NOTFOUND});
      } else {
        Object.assign(project, req.body);
        return project.save(function (err) {
          if (!err) {
            logger.info(req.method, req.path, "Updated project");
            return res.send({status: status.OK});
          } else {
            res.statusCode = 500;
            logger.error(req.method, req.path, err.method);
            return res.send({status: status.ERROR});
          }
        })
      }
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      return res.send({status: status.ERROR});
    }
  });
});

app.delete('/api/projects/:id', function (req, res){
  return mongoose.ProjectModel.findById(req.params.id, function (err, project) {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({staus: status.NOTFOUND})
      } else {
        return project.remove(function (err) {
          if (!err) {
            logger.info(req.method, req.path, "Removed project.");
            return res.send({staus: status.OK});
          } else {
            res.statusCode = 500;
            logger.console.error(req.method, req.path, err.message);
            return res.send({status: status.ERROR});
          }
        })
      }
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      return res.send({staus: status.ERROR})
    }
  })
});

app.listen(1337, function(){
    logger.log("SERVER", "localhost", "Express server listening on port 1337");
});
