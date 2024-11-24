'use strict'
var express = require('express');
var router = express.Router();



var { postLogin } = require('../Database/LoginCRUD.js');
router.post('/user/login', function (req, res) {


    console.log(req.body)
    var data = req.body
    var datas = postLogin(data);

    console.log(datas)
    if (datas) {
        res.send(JSON.stringify({ message: "Successful Loign" }));
    }
    else {
        res.send(JSON.stringify({ message: "Unsuccessful Loign" }));
    }

   



});
router.get('/user/login', function (req, res) {


 
    res.send(req.body);




});
module.exports = router;