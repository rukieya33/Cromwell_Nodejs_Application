'use strict'
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


var { postLogin } = require('../Database/LoginCRUD.js');
router.post('/user/login', function (req, res) {


    console.log(req.body)
    var data = req.body
    var datas = postLogin(data);
    const token = null;
    if (datas) {
        var jwtSecretKey = process.env.JWT_SECRET_KEY;
        var wt = {
            time: Date(),
            access: "userAccount",
            roleLevel: "user",
            userId: Math.round(Math.random() * 1000000000),
        }

        token = jwt.sign(wt, jwtSecretKey);
        res.send(res.status);
        res.send(token);

    }
    else {
        res.send("Incorrect user login details")
    }



});
router.get('/loginGet', function (req, res) {

    let headerTokenKey = process.env.TOKEN_HEADER_KEY;
    let wtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(headerTokenKey);

        const verified = jwt.verify(token, wtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
     
            return res.send("Access Denied");
        }
    } catch (error) {
      
        return res.send("Access Denied " + error);
    }

});

module.exports = router;