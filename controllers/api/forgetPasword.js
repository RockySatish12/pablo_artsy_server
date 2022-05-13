const { generatePassword } = require("../../util/paswordgenerator")
const Models = require('../../util/models')
const SendMail = require('../../util/sendMail')
const Crypto = require('../../util/crypto');

exports.postForgetPassword = (req, res, next) => {

    const username = req.body.username
    const email = req.body.email;

    Models.User.findOne({
        where:{id: username, email: email},
        attributes: {exclude: ['password']}
    }).then(user => {
        if(user){
            const password = generatePassword();
            const encryptPssword = Crypto.encrypt(password);
            user.password = JSON.stringify(encryptPssword);
            user.save();

            const msg = `Dear ${username}, \nYour password has been reseted successfully\n Your new password is \n${password}`
            SendMail.sendMail("Password Reset", msg, email);
            res.send({success: true, message: "Your new password has been sent to your mail"})
        }else{
            res.send({success: false, message: "No user found for the entered details"})
        }
    }).catch(error => {
        res.send({success: false, message: "Error occured Try Again!!"})
    })

}