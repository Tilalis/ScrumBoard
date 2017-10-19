const express    = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('./mongoose');
const Logger     = require('./logging').Logger;

const logger = new Logger("server");
logger.setLevel(Logger.LOG);

var app = express();

const status = {
  ERROR: "ERROR",
  OK: "OK",
  NOTFOUND: "NOT FOUND"
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
    res.send('I AM ALIVE!');
});

app.get('/api/projects', (req, res) => {
  return mongoose.Project.find(function (err, projects) {
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

app.get('/api/projects/:id', (req, res) => {
  return mongoose.Project.findById(req.params.id, function (err, project) {
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

app.post('/api/projects', (req, res) => {
  logger.info(req.method, req.path, JSON.stringify(req.body));
  delete req.body._id;
  var project = new mongoose.Project(req.body);

  project.save(function (err) {
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

app.put('/api/projects/:id', (req, res) => {
  return mongoose.Project.findById(req.params.id, function (err, project) {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({status: status.NOTFOUND});
      } else {
        delete req.body._id
        Object.assign(project, req.body);
        return project.save(function (err) {
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

app.delete('/api/projects/:id', (req, res) => {
  return mongoose.Project.findById(req.params.id, function (err, project) {
    if (!err) {
      if (!project) {
        res.statusCode = 404;
        logger.log(req.method, req.path, status.NOTFOUND);
        return res.send({staus: status.NOTFOUND})
      } else {
        return project.remove(function (err) {
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

let port = parseInt(process.argv[2]);
if (isNaN(port)) {
  port = 80;
}

app.listen(port, '0.0.0.0', () => {
  logger.log("SERVER", "localhost", "Server listening on port " + port);
})
.on('error', (err) => {
  logger.error("SERVER", "localhost", err);
  process.exit(1);
});

const stdin = process.openStdin();
stdin.addListener("data", (data) => {
    let str = data.toString().trim();
    switch (str.toLowerCase()) {
      case ".exit":
      case "exit":
      case ".stop":
      case "stop":
        process.exit(0);
        break;
      case ".clear":
      case "clear":
        console.log('\033c');
        break;
      default:
        console.log("Unknown command: %s", str);
        break;
    }
});
