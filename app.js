//Dependencies 
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var passportlocal = require('passport-local');
var flash    = require('connect-flash');
var favicon = require('serve-favicon');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');
var configDB = require('./config/database.js');
var path = require('path');
var app = express();
// Socket.io
var socketio = require('socket.io');
var server = http.Server(app);
var io = socketio(server);

var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require('./Manabu-c2f7a262c8e4.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middlewares

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport stuff
app.use(session({ secret: 'itslityah' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
//Application Components
require('./config/passport')(passport); // pass passport for configuration
require('./routes/index.js')(app,passport);

server.listen(7070);
// app.use('/', index);
// app.use('/users', users);


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
  res.status(404).send("404 Error");
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
	Socket.io stuff
*/
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('player scored',function(msg){
  	io.emit('chat message', msg);
  });
  
});
module.exports = app;
