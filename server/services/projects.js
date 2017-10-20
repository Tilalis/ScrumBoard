const users    = require('./users');
const mongoose = require('../utils/mongoose');
const Router   = require('express').Router;
const router   = new Router();

const Logger = require('../utils/logging').Logger;
const logger = new Logger("server");
logger.setLevel(Logger.LOG);

const status = {
  ERROR: "ERROR",
  OK: "OK",
  NOTFOUND: "NOT FOUND"
}

router.get('/', (req, res) => {
  return mongoose.Project.find((err, projects) => {
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

router.get('/:id', (req, res) => {
  return mongoose.Project.findById(req.params.id, (err, project) => {
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

router.post('/', users.auth, (req, res) => {
  logger.info(req.method, req.path, JSON.stringify(req.body));
  delete req.body._id;
  var project = new mongoose.Project(req.body);

  project.save((err) => {
    if (!err) {
      logger.info(req.method, req.path, "Added project.");
      res.send({status: status.OK, project: project});
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      res.send({status: status.ERROR});
    }
  })
});

router.put('/:id', users.auth, (req, res) => {
  return mongoose.Project.findById(req.params.id, (err, project) => {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({status: status.NOTFOUND});
      } else {
        delete req.body._id
        Object.assign(project, req.body);
        return project.save((err) => {
          if (!err) {
            logger.info(req.method, req.path, "Updated project");
            return res.send({status: status.OK, project: project});
          } else {
            res.statusCode = 500;
            logger.error(req.method, req.path, err.message);
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

router.delete('/:id', users.auth, (req, res) => {
  return mongoose.Project.findById(req.params.id, (err, project) => {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({staus: status.NOTFOUND})
      } else {
        return project.remove((err) => {
          if (!err) {
            logger.info(req.method, req.path, "Removed project.");
            return res.send({status: status.OK});
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
      return res.send({status: status.ERROR})
    }
  })
});

module.exports.router = router;
