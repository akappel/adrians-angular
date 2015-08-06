var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logger = require('morgan');

// create routing file for front end GETS,
// backend POSTS.
app.get('/', function(req, res) {
  res.render('index');
});

// Middleware to handle POSTS
app.post('/rest/api/message', function(req, res) {
  io.emit('message-received', {source: 'Client OMS'});
});
// For referencing our main starting point index.
// After loading, angular routing will take over for partials/templates.
app.set('view engine', 'jade');
app.set('views', './ang-app');

app.use(logger('dev'));
app.use(require('express').static('./ang-app/'));

server.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});

io.on('connection', function (socket) {
  console.log('client connected!');
  io.emit('client-connected', {msg: 'client connected!'});
});
