var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
const accountRegistration = require("mongoose");
//Import DB Schema Object
require("../models/account");

//is this necessary?
let userAccountModel = mongoose.model('userAccountModel');

console.log("loginbackend File is being touched");

router.get('/test', function (req, res, next){
    console.log("loginbackend/test is being touched")
    //Parsing Request
    var bodyofreq = req.body;
    var emailReceieved = bodyofreq.email;
    var passwordReceived = bodyofreq.password;
    console.log(bodyofreq);
    console.log(emailReceieved);
    console.log(passwordReceived);
    //Creating object of parsed data
    var accountLogin = new userAccountModel({
        email: emailReceieved,
        password: passwordReceived
    });


    userAccountModel.findOne({accountLogin}, function(err){
      if(err){
          console.log('Error in Finding the account in the DB')
      }
      if(accountLogin)
        {
          console.log(accountLogin);
          res.send()
        }
      else{
          console.log(accountLogin + " NOT FOUND");
        }

    })

})

module.exports = router;