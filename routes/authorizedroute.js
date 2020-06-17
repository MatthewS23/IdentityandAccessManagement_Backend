var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


//If a valid JSON Webtoken is received then a 200 response will return
//If the JSON Webtoken is invalid a 500 response occur
router.get('/secured', function (req, res, next) {
    //call method to extract the JWS String
    const tokenExtract = extractToken(req);
    //Extract Payload from the JWT
    const jwtContents = jwt.verify(tokenExtract, process.env.TOKEN_SECRET)
    console.log(jwtContents);
    //Do I need to parse jwt Payload and check DB again or has the JWT verified itself completely?
    res.send()
})

//Method to Extract token from header
function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports = router;