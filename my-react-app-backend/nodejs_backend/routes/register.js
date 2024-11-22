'use strict';
var express = require('express');
var router = express.Router();

var { postRegister } = require('../Database/RegisterCRUD.js');
router.post('/user/register', function (req, res) {

    
    console.log(req.body)
    var data = req.body
    var datas = postRegister(data);

    res.send(res.status);
    res.send(JSON.stringify(datas) );

});


module.exports = router;
