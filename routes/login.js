var express = require('express');
var router = express.Router();
var session=require('express-session');


var user={
  "ree":"yes",
  "soumik":"yes"
}
router.get('/', function(req, res, next) {
  //res.send('hello');
  //res.send('checked, working');
  res.render('homepage.ejs', { name: 'fag' });
});


router.post('/', function(req,res,next){
  if(req.body.email in user){
    req.session.email=req.body.email;
    req.session.cookie.maxAge = 600000;
    res.redirect('/home');
  }
  else{
    res.redirect('/');
  }
});


module.exports.router= router;
exports.user=user;
