'use strict';
var express = require('express');
var router = express.Router();

var { postRegister } = require('../Database/RegisterCRUD.js');
router.post('/user/register', function (req, res) {

   
    var data = req.body
    var myarray = [" "]
    var datas = postRegister(data, myarray);
   
    res.send(JSON.stringify({message: datas[1]}));
    console.log({ message: datas[1]})
});


module.exports = router;
