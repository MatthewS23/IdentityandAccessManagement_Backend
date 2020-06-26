var express = require('express');
// var findUserAccount = require("../Helper/findUserAccount");
var router = express.Router();
const jwt = require('jsonwebtoken');
var cors = require('cors')
let mongoose = require('mongoose');

var app = express();
app.options('*', cors());

//Import DB Schema Object
require("../models/account");
//is this necessary?
let userAccountModel = mongoose.model('userAccountModel');


router.get('/simplified', function (req, res, next){

    const tokenExtract = extractToken(req);
    console.log("The token extracted from req : " + tokenExtract);

    //Extract Payload from the JWT
        const jwtContents = jwt.verify(tokenExtract, process.env.TOKEN_SECRET, {complete:true});
        const jwtContents2 = jwt.decode(tokenExtract, {complete:true});
        console.log("JWT Header authorization: " + JSON.stringify(jwtContents.header));
        console.log("JWT Payload email: " + jwtContents.payload.email);
        const emailExtractFromToken = jwtContents.payload.email;
        const passwordExtractFromToken = jwtContents.payload.password;
        console.log(passwordExtractFromToken);
        const accountLogin = new userAccountModel({
            email: emailExtractFromToken,
            password: passwordExtractFromToken
        })
        userAccountModel.findOne({accountLogin}, function(err){
            if (accountLogin){
                res.sendStatus(200);
            }
            if (err){
                res.sendStatus(411);
            }
        })

})

//If a valid JSON Webtoken is received then a 200 response will return
//If the JSON Webtoken is invalid a 500 response occur
router.get('/secured', cors(), function (req, res, next) {

    //call method to extract the JWS String
    const tokenExtract = extractToken(req);
    //Extract Payload from the JWT
    const jwtContents = jwt.verify(tokenExtract, process.env.TOKEN_SECRET);
    const decodePayload = jwt.decode(tokenExtract, {complete: true});
    console.log("JWT Header : " + decodePayload.header);
    console.log("JWT Payload : " + decodePayload.payload);
    console.log("JWT Verify Contents : " + jwtContents);
    //Do I need to parse jwt Payload and check DB again or has the JWT verified itself completely?
    res.send()
})

//Method to Extract token from header
function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        console.log("Extract Token: " + req.headers.authorization.split(' ')[1]);
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports = router;

