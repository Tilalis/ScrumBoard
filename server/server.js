const express = require('express');
var app = express();

app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete

app.get('/', function(req, res) {
    res.send('I AM ALIVE!');
});

app.get('/api/projects', function(req, res) {
    res.send('This is not implemented now');
});

app.post('/api/projects', function(req, res) {
    res.send('This is not implemented now');
});

app.delete('/api/projects/:id', function (req, res){
    res.send('This is not implemented now');
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});
