var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var Users = require('./models/Users.js');


var feed = require('./routes/feed');
var favorites = require('./routes/favorites');
var login = require('./routes/login');
var profile = require('./routes/profile');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: '7cb002d2a9ca3b1594a5',
    clientSecret: '8e021968a5b0f2af537b8795ba3dde9ee295db09',
    callbackURL: "http://ec2-52-34-113-49.us-west-2.compute.amazonaws.com/github/callback"
    //callbackURL:"http://localhost/github/callback"
},
  function(accessToken, refreshToken, profile, done) {
    done(null, {accessToken: accessToken, 
      profile: profile
  });
}));

passport.serializeUser(function(user, done) {
  var dbUser;
  Users.getUser(user.profile.id, function(aUser){
    dbUser = aUser;
    console.log(dbUser);
    if (dbUser.length == 0) {
      console.log('new user');
      Users.addUser(user.profile.id, user.profile.username, function() {
        console.log('done');
      });
    }
  });

  // for the time being tou can serialize the user 
  // object {accessToken: accessToken, profile: profile }
  // In the real app you might be storing on the id like user.profile.id
  done(null, user.profile);
});

passport.deserializeUser(function(user, done) {
  // If you are storing the whole user on session we can just pass to the done method, 
  // But if you are storing the user id you need to query your db and get the user 
  //object and pass to done() 
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Make io accessible to our router
app.use(function(req,res,next){
    res.io = io;
    next();
});

io.on('connection', function(socket) {
  Users.addActiveUser(function() {
    console.log('added active user');
    io.emit('active');
});
  socket.on('disconnect', function() {
    Users.removeActiveUser(function() {
      console.log('removed user');
      io.emit('unactive');
    }); 
  });
  socket.on('connect', function() {
    Users.removeActiveUser(function() {
      console.log('removed user');
      io.emit('unactive');
    });
  });
  socket.on('timeout', function() {
    io.emit('unactive');
    Users.removeActiveUser(function() {
      console.log('removed user');
    });
  });
});

app.use('/feed', feed);
app.use('/favorites', favorites);
app.use('/', login);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = {app: app, server: server};
