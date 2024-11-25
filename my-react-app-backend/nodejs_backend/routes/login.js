'use strict'
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



function decryptPassword(psw) {
    const passphrase = 'pass333';
    const bytes = cryptoJS.AES.decrypt(psw, passphrase);
    const originalText = bytes.toString();

    return originalText;
}

router.post('/user/login', function (req, res) {


    console.log(req.body)
    var data = req.body
    var myarray = []
    client.query("Select * from register", (err, result) => {



        if (err) {
            console.error('Error executing query', err);
        }






        console.log(result.rows);





        console.log(data["psw"])
        console.log(data["email"])
        var emails = result.rows.filter((element) => decryptEmail(element) == data["email"])
        var passes = result.rows.filter((element) => decryptPassword(element) == data["psw"])
        if (emails != [] && passes != []) {


            client.query("INSERT INTO credentials (credentials_id, email, login) values($1,$2,$3)", [Math.round(Math.random() * 1000000000),
            emails[0], passes[0]], (err, result) => {

                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result.rows)
                }
            })



            console.log("Successful Loign")
            myarray.push("Successful")
        }
        else {
            myarray.push("Unsuccessful")
        }
        console.log(myarray)

        res.send(JSON.stringify({ message: myarray[0] }));
    })


});

module.exports = router;