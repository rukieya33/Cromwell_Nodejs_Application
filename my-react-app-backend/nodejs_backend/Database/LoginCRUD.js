const { client } = require('../Database/DBConnection.js');
const cryptoJS = require('crypto-js');
function postLogin(data) {

    client.query("Select * from register", (err, result) => {


       
        if (err) {
            console.error('Error executing query', err);
        }
        else {
            console.log(result.rows);
         
            for (var row in result.rows) {
             

                var foundEmail = decryptEmail(result.rows[row].email);
                var foundPassword = decryptPassword(result.rows[row].psw);
                console.log(result.rows[row].email)
                console.log(foundEmail)
                console.log(data["emailLogin"] == foundEmail)
                console.log(data["emailLogin"])
                if (data["emailLogin"] == foundEmail && data["passwordLogin"] == foundPassword) {


                   
                    return true;
                    
                }
                else {
                  
                    return false;
                   
                }
                client.query("INSERT INTO credentials (credentials_id, email, login) values($1,$2,$3)", [Math.round(Math.random() * 1000000000),
                result.rows[row].email, result.rows[row].psw], (err, result) => {

                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result.rows)
                    }
                })
            }

        }

    })




}

function decryptEmail(email) {
   
    const passphrase = 'email444';
   
    const bytes = cryptoJS.AES.decrypt(email, passphrase);
  
    const originalText = bytes.toString();
  
    return originalText;
}



function decryptPassword(psw) {
    const passphrase = 'pass333';
    const bytes = cryptoJS.AES.decrypt(psw, passphrase);
    const originalText = bytes.toString(cryptoJS.enc.Utf8);

    return originalText;
}






module.exports = { postLogin };
