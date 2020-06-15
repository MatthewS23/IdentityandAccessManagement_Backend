var express = require('express');
var router = express.Router();
var cors = require('cors');
let mongoose = require('mongoose');
//Import Account Object Schema to save to DB
require("../models/account");
let userAccountModel = mongoose.model('userAccountModel');
router.post('/', function(req, res, next){
    //Parsing Request
    var bodyofreq = req.body;
    var emailReceieved = bodyofreq.email;
    var passwordReceived = bodyofreq.password;
    console.log(bodyofreq);
    console.log(emailReceieved);
    console.log(passwordReceived);
    //Creating object of parsed data
    let accountRegistration = new userAccountModel({
        email: emailReceieved,
        password: passwordReceived
    });

    //res.send("Succesful Request");

    //Store in DB:
    accountRegistration.save(function(error, data){
        if(error){
            console.log('Account DB Save Error');
        }
        else{
            console.log("Successful Account Save");
            res.send();
        }
    });
});



module.exports = router;