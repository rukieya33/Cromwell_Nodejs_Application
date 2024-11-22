const client = require('../Database/DBConnection.js');
function postLogin(data) {




    var datas = false;



    client.query("Select * from register", (err, result) => {


       
        if (err) {
            console.error('Error executing query', err);
        }
        else {
            console.log(result);
            var emailEncrypted = " ";
            var pswEncrypted = " ";
            for (var row in result.rows) {
                var emailEncrypted = row["email"];
                var pswEncrypted = row["psw"];

                var found = checkAccountExist(emailEncrypted, pswEncrypted);

                var { email, password } = found;

                if (email == data["email"] && password == data["newPassword"]) {
                    
                    datas =  true;
                }
                else {
                    datas =  false;

                }
               
            }
            client.query("INSERT INTO credentials (credentials_id, email, psw) values($1,$2,$3)", [Math.round(Math.random() * 1000000000),
                emailEncrypted, pswEncrypted], (err, result) => {

                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result)
                }
            })
        }

    })

    console.log(datas);
    return datas;

}



function checkAccountExist(email, psw) {
    const decryptedEmail = () => {
        const passphrase = 'email444';
        const bytes = CryptoJS.AES.decrypt(email, passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
        return originalText;
    };
    
    
    
    const decryptedPassword = () => {
        const passphrase = 'pass333';
        const bytes = CryptoJS.AES.decrypt(psw, passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
        return originalText;
    };


    var decryptedObj = {
        decEmail : decryptedEmail,
        decPass : decryptedPassword
    }

    return decryptedObj;
}


module.exports = postLogin;
