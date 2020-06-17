var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const cookie = require('cookie-parser');
//import and configure dotenv
const dotenv = require("dotenv");

// config dotenv
dotenv.config();

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
            var accessToken = jwt.sign({email: emailReceieved, password: passwordReceived}, process.env.TOKEN_SECRET, {expiresIn: '1hr'})
            //console.log(process.env.TOKEN_SECRET);
          console.log(accountLogin);
            console.log(accessToken);
            //The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests.
            // Without this setting, an XSS attack could use document.cookie to get a list of stored cookies and their values.
            res.cookie('token', accessToken, {httponly: true});
          res.json({accessToken});
        }
      else{
          console.log(accountLogin + " NOT FOUND");
        }

    })

})

module.exports = router;