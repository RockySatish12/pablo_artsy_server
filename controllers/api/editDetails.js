const Models = require('../../util/models');
const fs = require('fs');
const cloudinary = require('../../util/cloudinary');
const Crypto = require('../../util/crypto');
const { json } = require('express/lib/response');
const emailMsg = require('../../util/emailMsg');

function updateAddress(user, address){

    Models.Address.findOne({
        where: {userId: user},
    })
    .then(fetchedAddress => {
        fetchedAddress.province = address.province;
        fetchedAddress.district = address.district;
        fetchedAddress.city = address.city;
        fetchedAddress.street = address.street;

        fetchedAddress.save();
        console.log("Updated");
    }).catch(error => {
        console.log(error);
    })

}


exports.postUpdateDetails = async (req,res,next) => {
    const jsonUser = req.body.user;
    const address = jsonUser.address;
    const imageBase64 = req.body.image;

    //If image is uploaded
        try{
            //comvert base64 to image
            const buffer = Buffer.from(imageBase64, "base64")
            const imageName = jsonUser.id + jsonUser.dob + Date.now()  + '.jpg' //generate image name
            fs.writeFileSync(imageName, buffer)//save image
            //upload to cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(imageName,
            { public_id: imageName}, 
            function(error, result) {
                fs.unlinkSync(imageName) // delete Image
                console.log(result);
                jsonUser.imageUrl = result.secure_url;
            });
    
        }catch(error){
            console.log("ERROR!!!!!!!!!!!!!!!" + error)
        }

    Models.User.findByPk(jsonUser.id, {
        include: [Models.Address]
    })
    .then(user => {
        user.name = jsonUser.name;
        user.email = jsonUser.email;
        user.phoneNumber = jsonUser.phoneNumber;
        user.dob = jsonUser.dob;
        user.imageUrl = jsonUser.imageUrl

        user.address.province = address.province;
        user.address.district = address.district;
        user.address.city = address.city;
        user.address.street = address.street;

        updateAddress(jsonUser.id, address)

        user.save();
        res.send({success: true, errorMessage: null});
    })
    .catch(error => {
        res.send({success: false, errorMessage: error})
        console.log(error);
    })
}

exports.postChangePassword = async (req, res, next) => {
    const username = req.body.username
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    Models.User.findByPk(username)
    .then(user => {
        if(user){
            const passwordDecrypted = Crypto.decrypt(JSON.parse(user.password));

            if(oldPassword === passwordDecrypted){
                const passwordHash = Crypto.encrypt(newPassword);
                user.password = JSON.stringify(passwordHash);
                user.save();
                console.log("Password Change ===> Changed")
                emailMsg.PasswordChanged(user.email, username);
                res.send({
                    status: true,
                    message: "Password changed successfully"
                })
            }else{
                console.log("Password Change ===> not match")
                res.send({
                    status: false,
                    message: "Password doesn't match"
                })
            }
        }else{
            console.log("Password Change ===> no user")
            res.send({
                status: false,
                message: "Password doesn't match"
            })
        }
    })
    .catch(error => {
        console.log("Change Password ====>" + error)
        res.send({
            status: false,
            message: "Error occured Try Again!!"
        })
    })


}