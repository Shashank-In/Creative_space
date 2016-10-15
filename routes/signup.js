var express = require('express');
var uuid=require('node-uuid');
var fs=require('fs');
var user=require('./login.js');
user=user.user;
var router = express.Router();

router.post('/', function(req,res,next){
  if(req.body.password=="1234"){
      user[req.body.email]="yes";
      res.redirect('/');
    }
    else{
      res.redirect('/');
    }
});

module.exports = router;
