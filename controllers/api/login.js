const Crypto = require('../../util/crypto')
const Models = require('../../util/models')

exports.postLogin = (req, res, next) => {
    console.log("Listened");
    const username = req.body.username;
    const password = req.body.password;

    Models.User.findByPk(username, {
        include:['address','collector','artist']
    })
    .then(user => {
        console.log(user);
        if(!user){
            res.send({success:false, user:null, message:"User Not Found"});
        }else{
            const passwordDecrypted = Crypto.decrypt(JSON.parse(user.password));
            if(user.id === username && passwordDecrypted === password){
                delete user.password;
                res.send({success:true, user:user, message:"Login Succesful"});
            }else{
                res.send({success:false, user:null, message:"Incorrect Password"});
            }
        }
    })
    .catch(err => {
        console.log(err);
    })
}