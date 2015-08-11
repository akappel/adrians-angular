/// <reference path="typings/tsd.d.ts" />


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var jsonParser = require('body-parser').json();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk ('localhost:27017/messages');

// Add a JSON parser to the POST requests
app.use('/rest/api/message', jsonParser);

app.use(logger('dev'));
app.use(require('express').static('./ang-app/'));

// After loading, angular routing will take over for partials/templates.
app.set('view engine', 'jade');
app.set('views', './ang-app');

// Serve up our entry point for the client-side
app.get('/', function(req, res) {
  res.render('index');
});

// Middleware to handle POSTS
app.post('/rest/api/message', function(req, res) {
  var messagesLog = db.get('messagesLog');
  messagesLog.insert(req.body);
  console.log(req.body);
  io.emit('message-received', req.body);
  res.send(req.body);
});

server.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});

