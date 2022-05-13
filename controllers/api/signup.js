const fs = require('fs');
const cloudinary = require('../../util/cloudinary');
const sequelize = require('../../util/database');
const Constants = require('../../util/constants')
const Crypto = require('../../util/crypto')

const imagePath = 'images/'

//Models
const Models = require('../../util/models')


//function to add address
function addAddress(user, address){
    user.createAddress(address)
    .then(address =>{
        console.log("Address Added");
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postSignupCollector = async (req,res,next) => {
    const jsonUser = req.body.user;
    const address = jsonUser.address;
    const imageBase64 = req.body.image;

    //If image is uploaded
    try{
        //comvert base64 to image
        const buffer = Buffer.from(imageBase64, "base64")
        const imageName = jsonUser.id + jsonUser.dob + Date.now()  + '.jpg'//generate image name
        fs.writeFileSync(imageName, buffer)//save image
        //upload to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(imageName,
        { public_id: imageName }, 
        function(error, result) {
            fs.unlinkSync(imageName) // delete Image
            console.log(result);
            jsonUser.imageUrl = result.secure_url;
        });

    }catch(error){
        if(imageBase64 == null){
            jsonUser.imageUrl = 'https://res.cloudinary.com/du7pn6pke/image/upload/v1643312779/Screenshot_2022-01-28_at_01-30-01_Anonymous_icon_privacy_concept_human_head_vector_image_on_VectorStock_eu3cnh.png';
        }else{
            console.log("ERROR!!!!!!!!!!!!!!!" + error)
            res.send({success: false, errorMessage: err})
            return
        }
    }

    const passwordHash = Crypto.encrypt(jsonUser.password);
    jsonUser.password = JSON.stringify(passwordHash);

    //creating user
    Models.User.create(jsonUser)
    .then(user => {
        console.log("User created");
        addAddress(user, address);
        user.createCollector()
        .then(result => {
            console.log('Collector created')
            res.send({success: true, errorMessage: ""})
        })
        .catch(err => {
            res.send({success: false, errorMessage: err})
        });
    }).catch(err => {
        res.send({success: false, errorMessage: err})
        console.log(err);
    })
}

exports.postSignupArtist = async (req,res,next) => {
    const jsonUser = req.body.user;
    const address = jsonUser.address;
    const artist = jsonUser.artist;
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
        if(imageBase64 == null){
            jsonUser.imageUrl = 'https://res.cloudinary.com/du7pn6pke/image/upload/v1643312779/Screenshot_2022-01-28_at_01-30-01_Anonymous_icon_privacy_concept_human_head_vector_image_on_VectorStock_eu3cnh.png';
        }else{
            console.log("ERROR!!!!!!!!!!!!!!!" + error)
            res.send({success: false, errorMessage: err})
        }
    }

    const passwordHash = Crypto.encrypt(jsonUser.password);
    jsonUser.password = JSON.stringify(passwordHash);

    //creating user
    Models.User.create(jsonUser)
    .then(user => {
        console.log("User created");
        addAddress(user, address);
        user.createArtist(artist)
        .then(result => {
            console.log('Artist created')
            res.send({success: true, errorMessage: ""})
        })
        .catch(err => {
            res.send({success: false, errorMessage: err})
        });
    }).catch(err => {
        res.send({success: false, errorMessage: err})
        console.log(err);
    })
}

exports.getUerName = async (req, res, next) => {
    const username = req.params.username;

    Models.User.count({where:{id:username}})
    .then(count => {
        if(count >0){
            console.log("Listened")
            res.send({
                status:true,
                message: "Username already Exists"
            });
        }else{
            console.log("Listened")
            res.send({
                status:false,
                message: "Uername valid"
            });
        }
    }).catch(error => {
        console.log(error);
    })
}

