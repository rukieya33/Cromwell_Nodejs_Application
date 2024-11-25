'use strict';
var express = require('express');
var router = express.Router();

const { client } = require('../Database/DBConnection.js');
const cryptoJS = require('crypto-js');

function decryptEmail(email) {
    const passphrase = 'pass444';
    const bytes = cryptoJS.AES.decrypt(email, passphrase);
    const originalText = bytes.toString();

    return originalText;
}

router.get('/user', function (req, res) {


    client.query("Select * from register", (err, result) => {
        if (err) {
            console.log(err)
        }


        var found = result.rows.filter((element) => decryptEmail(element) == req.params["email"])
        
        res.send(JSON.stringify({ datas: result.rows }));

        console.log(found)
    })


});


module.exports = router;
