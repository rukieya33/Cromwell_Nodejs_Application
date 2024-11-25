'use strict';
const cryptoJS = require('crypto-js');


const { client } = require('../Database/DBConnection.js');

function decryptEmail(email) {

    const passphrase = 'pass444';
 
    const bytes = cryptoJS.AES.decrypt(email, passphrase);

    const originalText = bytes.toString(cryptoJS.enc.Utf8);
    
    return originalText;
}



function decryptPassword(password) {
    const passphrase = 'pass333';
    const bytes = cryptoJS.AES.decrypt(password, passphrase);
    const originalText = bytes.toString();
   
    return originalText;
}
function passwordEncrypted(password) {
    const passphrase = 'pass333';
    return cryptoJS.AES.encrypt(password, passphrase).toString();
};
function emailEncrypted (email) {
    const passphrase = 'pass444';
    return cryptoJS.AES.encrypt(email, passphrase).toString();
};
function hashEmailAndPassword(data) {
 
    var hashObj = {};
    var email = "";
    var psw = "";

    var email = emailEncrypted(data["email"])
    var psw = passwordEncrypted(data["newPassword"])
    hashObj = {
       email: email, 
       password: psw
        
    }

    return hashObj;
}

function postRegister(data, myarray) {
   
  


    var t = ["Account Exist", "Successful Registration"]

    var encryptedDetails = hashEmailAndPassword(data);

    var { email, password } = encryptedDetails;


        
     


        

    client.query("INSERT INTO register (first_name, last_name, email, psw, register_id) values($1, $2, $3, $4, $5)", [data["firstName"], data["lastName"], email, password, Math.round(Math.random() * 1000000000)], (err, result) => {

        if (err) {
            console.error('Error executing query', err);
        }
        console.log(t[1])
       

    })

             



                




    myarray.push("Successful Registration")

    return myarray;
           
}


 function getRegister() {
     
}

module.exports = { postRegister, getRegister };
