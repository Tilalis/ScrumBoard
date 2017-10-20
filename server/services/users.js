const Router   = require('express').Router;
const session  = require('express-session');
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

const _session = session({
  secret: "dQWESDjasdlk213",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 2147483647 }
});

const auth = (req, res, next) => {
  if (req.session && req.session.logined) {
    return next();
  } else {
    logger.log(req.method, req.path, JSON.stringify(req.session.logined));
    logger.log(req.method, req.path, "Unauthorized access.");
    res.statusCode = 401;
    return res.send({status: status.UNAUTHORIZED});
  }
};

const router = new Router();

router.post('/login', (req, res) => {
  return mongoose.User.findOne({name: req.body.name}, (err, user) => {
    if (!err) {
      if (!user) {
        logger.log(req.method, req.path, "User not found at login.");
        res.statusCode = 404;
        return res.send({status: status.NOTFOUND});
      } else {
        if (user.check(req.body.password)) {
          logger.log(req.method, req.path, "User logined.");
          req.session.logined = true;
          return res.send({status: status.OK});
        } else {
          res.statusCode = 500;
          logger.log(req.method, req.path, "Bad login.");
          req.session.logined = false;
          return res.send({status: status.ERROR});
        }
      }
    } else {
      res.statusCode = 500;
      logger.error(req.method, req.path, err.message);
      return res.send({status: status.ERROR});
    }
  });
});

router.post('/register', (req, res) => {
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

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      logger.log(req.method, req.path, "User logged out");
      res.send({status: status.OK});
    } else {
      logger.error(req.method, req.path, err.message);
      res.send({status: status.ERROR});
    }
  });
});

module.exports = {
  router: router,
  auth: auth,
  session: _session
}
