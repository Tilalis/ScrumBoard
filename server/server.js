const express    = require('express');
const session    = require('express-session');
const bodyParser = require('body-parser');
const projects   = require('./services/projects');
const users      = require('./services/users');

const Logger = require('./utils/logging').Logger;
const logger = new Logger("server");
logger.setLevel(Logger.LOG);

const app = express();

app.use(bodyParser.json());
app.use(users.session);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
    res.send('I AM ALIVE!');
});

app.use('/api/projects', projects.router);
app.use('/api/users', users.router);

app.get('/login', (req, res) => {
  if (!req.query.username || !req.query.password) {
      res.send('login failed');
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.logined = true;
    res.send("login success!");
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send("Eh.");
});

app.get('/eh', users.auth, (req, res) => {
  res.send("HEEEEEEEY!");
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
