const Router   = require('express').Router;
const mongoose = require('../utils/mongoose');

const Logger = require('../utils/logging').Logger;
const logger = new Logger("server");
logger.setLevel(Logger.LOG);

const status = {
  ERROR: "ERROR",
  OK: "OK",
  NOTFOUND: "NOT FOUND",
  UNAUTHORIZED: "UNAUTHORIZED"
}

const router = new Router();

router.post('/', (req, res) => {
  let user = new mongoose.User();
  user.name = req.body.name;
  user.hash = user.encrypt(req.body.password);

  user.save((err) => {
    if (!err) {
      logger.log(req.method, req.path, "New user.");
      res.send({status: status.OK, user: user});
    } else {
      logger.error(req.method, req.path, err.message);
      res.send({status: status.ERROR})
    }
  });
});


module.exports = {
  router: router
}
