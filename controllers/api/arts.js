//modules
const fs = require('fs');
const cloudinary = require('../../util/cloudinary');
const sequelize = require('../../util/database');
const Constants = require('../../util/constants')
const imagePath = 'images/'

//Models
const Models = require('../../util/models')

//Function to add recentview
function addRecentView(username, artId){
    
    let fetchedCollector
    let recentView;
    Models.Collector.findOne({where:{userId: username}})
    .then(collector => {
        if(collector){
            fetchedCollector = collector;
            return collector.getRecentView();
        }
    })
    .then(recentViews => {
        if(recentViews){
            recentView = recentViews;
            return recentViews;
        }else{
            return fetchedCollector.createRecentView();
        }
    })
    .then(recentViews => {
        return recentViews.getArts({where: {id: artId}});
    })
    .then(arts => {
        let art;
        if(arts.length >0){
            art = arts[0];
        }

        if(art){
            return art;
        }
        return Models.Art.findByPk(artId)
    })
    .then(art => {
        const updatedAt = new Date();
        return recentView.addArt(art, {through: {'viewedAt': updatedAt}});
    })
    .catch(err => {
        console.log(err);
    })
}

//Add art uploaded by user
exports.postAddArt = async (req, res, next) => {
    const username = req.body.username;
    const jsonArt = req.body.art;
    const image = req.body.image;
    
    //Upload image to image server
    try{
        //comvert base64 to image
        const buffer = Buffer.from(image, "base64")
        const imageName = username + Date.now() //generate image name
        fs.writeFileSync(imageName + ".jpg", buffer)//save image
        //upload to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(imageName+".jpg",
        { public_id: imageName , secure:true}, 
        function(error, result) {
            fs.unlinkSync(imageName + ".jpg") // delete Image
            console.log(result);
            jsonArt.imageUrl = result.secure_url;
        });

    }catch(error){
        console.log("ERROR!!!!!!!!!!!!!!!" + error)
        res.send({success: false, errorMessage: "Image cannot be uploaded"})    
        return
    }


    //Adding Art to database
    Models.User.findByPk(username)
    .then(user => {
        return user.getArtist()
    })
    .then(artist => {
        artist.totalArts = artist.totalArts + 1;
        artist.artsOnSale = artist.artsOnSale + 1;
        artist.save()
        return artist.createArt(jsonArt);
    })
    .then(result => {
        res.send({success: true, errorMessage: ""})
    })
    .catch(err =>{
        console.log(err);
        res.send({success: false, errorMessage: err})
    });

};


//Get recently added arts
exports.getRecentlyAdded = (req,res, next) => {

    const limitValue = parseInt(req.params.limitValue);

    Models.Art.findAll({where:{
        onSale: true
    },
    limit: limitValue,
    include: ['artist'],
    order:[['createdAt', 'DESC']]}
    )
    .then(result => {
        res.send({success: true, data: result, error: null})
    })
    .catch(err => {
        res.send({success: true, data: null, error: err});
        console.log(err);
    }
        )
};


//get all arts on sale
exports.getAllArtOnSale = (req,res,next) => {
    Models.Art.findAll({where:{
        onSale: true
    },
    order:[['createdAt', 'DESC']]}
    )
    .then(result => res.send({success: true, data: result, error: null}))
    .catch(err => {
        res.send({success: true, data: null, error: err});
        console.log(err);
    }
   )  
};


//get details of art including artist
exports.getArtDetail = (req, res,next) => {
    const artId = req.params.artId;
    const username = req.body.username
    var data; //data to be sent to user

    //retrive art from database
    Models.Art.findByPk(artId, 
        {include: [{model: Models.Artist}, {model: Models.ArtCategory}]}
    ).then(art => {
        data = {art:art} //adding art to data
        const user = Models.User.findByPk(username);
        
        addRecentView(username, artId) // adding art as recent;y viewed
        
        let userId = art.artist.userId
        console.log(userId);
        return Models.User.findByPk(userId, 
            {
                include:['address','collector','artist'],
                attributes: {exclude: ['password']},
            })  //finding artist
    })
    .then(user => {
        data['user'] = user; // adding artist to data
        res.send({success: true, data: data, errorMessage: null}) //sending data to user
    })
    .catch(err => {
        console.log(err);
        //sending not error message to user
        res.send({success: false, data: null, errorMessage: "Data not found"})
    })
}

exports.getArtDetailsWithOrders = (req, res, next) => {
    const artId = req.query.artId;
    const username = req.query.username;

    Models.Art.findByPk(
        artId,
        {
            include: [
                {model: Models.Artist, include: [Models.User]},
                {
                    model: Models.Orders,
                     limit: 1,
                     order: [['amount', 'DESC']]
                }
            ]
        }
        ).then(art => {
            if(art){
                res.send({
                    art: art,
                    errorMessage: null
                });
            }else{
                res.send({art: null, errorMessage: "No data Found", username:username})
            }
        })
        .catch(error => {
            console.log(error)
            res.send({art: null, errorMessage: error})
        })
}

exports.getTopOrders = (req, res, next) => {
    const artId = req.query.artId;

    Models.Art.findByPk(artId)
    .then(art => {
        art.getOrders({
            include: [{
                model: Models.Collector, 
                include: [{
                    model:Models.User,
                    include: [Models.Address],
                    attributes: {exclude: ['password']}
                }]
            }]
        }).then(orders => {
            return orders;
        })
    })
    .tehn(orders => {
        res.send({
            status:true,
            orders: orders
        })
    })
    .catch(error => {
        console.log("Top Orders =======> " + error)
        res.send({
            status: false,
            errorMessage: "Error occured while fetching"
        })
    })
}