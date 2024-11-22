'use strict';
const cryptoJS = require('crypto-js');
const client = require('../Database/DBConnection.js');
function hashEmailAndPassword(email, password) {
    var passwordText = password;
    var emailText = email;
    var hashObj = {};
    const passwordEncrypted = () => {
        const passphrase = 'pass333';
        return cryptoJS.AES.encrypt(passwordText, passphrase).toString();
    };
    const emailEncrypted = () => {
        const passphrase = 'email444';
        return cryptoJS.AES.encrypt(emailText, passphrase).toString();
    };

    hashObj.personalEmail = emailEncrypted;
    hashObj.psw = passwordEncrypted

    return hashObj;
}
function postRegister(data) {

    var { personalEmail, psw } = hashEmailAndPassword(data["email"], data["newPassword"]);


    var datas = {};
    

    
        client.query("INSERT INTO register (first_name, last_name, email, psw, register_id) values($1,$2,$3,$4,$5)", [
            data["firstName"], data["lastName"], personalEmail, psw, Math.round(Math.random() * 1000000000)], (err, result) => {

            if (err) {
                console.error('Error executing query', err);
            }
            else {
                console.log(result);
                datas = { message: "Successful Registration" };
            }
       
    })
       
   
               

    
    

    return datas;
    
}
 function getRegister() {
     
}

        module.exports = {postRegister, getRegister };
