var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var formidable= require('formidable');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session= require('express-session');
var fs=require('fs');
var mkdirp=require('mkdirp');

var routes = require('./routes/index');
var login = require('./routes/login');
login=login.router;
var signup= require('./routes/signup');
var app = express();

app.use(session({secret: 'dsaknckabcejdacijcneceeacljdba'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login',login);
app.use('/signup',signup);

app.use('/home', function(req,res,next){
  if(req.session.email){
    var path2='./uploads/'+req.session.email+'/';
    mkdirp(path2);
    res.render('homepage.ejs', {name:req.session.email});
  }
  else{
    res.redirect('/');
  }
});

app.use('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
});

/*app.get('/upload',function(req,res,next){
  if(req.session.email){
    res.render('upload.ejs');
  }
  else{
    res.redirect('/');
  }
});*/

app.post('/upload',function(req,res,next){
  form = new formidable.IncomingForm();
  var path1='./uploads/'+req.session.email+'/';
  form.uploadDir = path1;
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.parse(req, function(err, fields, files) {
    console.log("received upload");
  });
  res.redirect('/home');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//prevent leak of stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



app.listen(4545);
module.exports = app;
