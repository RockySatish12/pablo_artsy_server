const res = require('express/lib/response');
const Models = require('../../util/models')

exports.getTopTenArtist = (req,res,next) => {
    Models.User.findAll({
        where: {
            userType: 'Artist'
        },
        limit: 10,
        include: ['artist'],
        order:[[Models.Artist, 'artsSold', 'DESC']],
        attributes: {exclude: ['password']}
    })
    .then(artists => {
        res.send({
            success: true,
            data: artists,
            errorMessage: null
        })
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            data: null,
            errorMessage: "Sorry no artists found"
        })
    })
}

exports.getAtistDeails = (req, res, next) => {
    const username = req.params.username;

    Models.User.findOne({
        where:{
        id: username
        },
        include:['address','collector','artist'],
        attributes: {exclude: ['password']}
    }).then(user => {
        if(user){
            res.send({
                success: true,
                artist_detail:user,
                errorMessage: null
            })
        }else{
            res.send({
                success: false,
                artist_detail:null,
                errorMessage: "Artist does not exists"
            })
        }
    }).catch(error => {
        console.log(error);
        res.send({
            success: false,
            artist_detail:null,
            errorMessage: error
        })
    })
}

exports.getRecentWorks = (req, res, next) => {
    const username = req.params.username;

    Models.Artist.findOne({where:{
        userId: username
    }}).then(artist => {
        if(artist){
            return artist.getArts({
                order:[['createdAt', 'DESC']]
            });
        }else{
            res.send({
                success: false,
                recent_works:null,
                errorMessage: "No Arts"
            })
        }
    }).then(arts => {
        res.send({
            success: true,
            recent_works: arts,
            errorMessage: null
        })
    }).catch(error => {
        console.log(error);
        res.send({
            success: false,
            recent_works:null,
            errorMessage: error
        })
    })
    
}

exports.getBankDetails = (req, res, next) => {

    const username = req.params.username

    Models.Artist.findOne({
        where: {
            userId: username
        }
    })
    .then(artist => {
        return artist.getBank()
    })
    .then(bank => {
        res.send({
            status: true,
            data: bank,
            errorMessage: null
        })
    })
    .catch(error => {
        res.send({
            status: false,
            data: {},
            errorMessage: error
        })
        console.log("Bank Details ====> " + error);
    })

}

exports.getPaymentDetails = (req, res, next) => {

    const username = req.params.username

    Models.Artist.findOne({
        where: {
            userId: username
        }
    })
    .then(artist => {
        return artist.getPayment()
    })
    .then(payment => {
        res.send({
            status: true,
            data: payment,
            errorMessage: null
        })
    })
    .catch(error => {
        res.send({
            status: false,
            data: {},
            errorMessage: error
        })
        console.log("Payment Details ====> " + error);
    })

}

exports.postBankDetails = (req, res, next) => {

    const username = req.body.username;
    const bank= JSON.parse(req.body.Bank);
    console.log("Bank request ===> " + username);
    console.log("Bank request ===> " + bank);
    
    let artists;

    Models.Artist.findOne({
        where: {
            userId: username
        }
    })
    .then(artist => {
        if(artist){
            artist.getBank()
            .then(fetchedBank => {
                if(fetchedBank){
                    console.log("Bank Details ====> " + JSON.stringify(fetchedBank));
                    fetchedBank.bank_name = bank.bank_name;
                    fetchedBank.acc_number = bank.acc_number;
                    fetchedBank.acc_holder_name = bank.acc_holder_name;
                    fetchedBank.save();
                    console.log("Bank Details ====> " + JSON.stringify(fetchedBank))
                    res.send({status: true, message: "Succesfully Updated"});
                }else{
                    artist.createBank(bank)
                    .then(banks => {
                        res.send({status: true, message: "Succesfully Added"})
                    }).catch(error => {
                        res.send({
                            status: false,
                            message: "Error on Adding"
                        })
                        console.log("Bank Details ====> " + error);
                    })
                }
            })
            .catch(error => {
                console.log("Bank Details ====> " + error);
                res.send({
                    status: false,
                     message: error
                })
            })   
        }
        console.log("Bank request failed => No User");
        return null;
    })
    .catch(error => {
        console.log("Bank Details ====> " + error);
        res.send({
            status: false,
             message: error
        })
    })

}

exports.deleteArt = (req, res, next) => {
    const username = req.body.username;
    const artId = req.body.artId;

    Models.Artist.findOne(
        {where: {userId: username}}
    )
    .then(artist => {
        if(artist){
            Models.Art.destroy({where:{id: artId, artistId: artist.id}})
            .then(function(rowDeleted){
                if(rowDeleted === 1){
                    removeNUlls();
                    artist.artsOnSale = parseInt(artist.artsOnSale) - 1;
                    artist.totalArts = parseInt(artist.totalArts) - 1;
                    artist.save();
                    res.send({
                        status: true,
                        message: "Art Deleted Succesfully"
                    })
                   console.log('Art Deleted successfully');
                 }else{
                    res.send({
                        status: false,
                        message: "Art Deletion Failed"
                    })
                    console.log('Art Deletion Failed');
                 }
              }, function(err){
                  console.log(err);
                  res.send({
                    status: false,
                    message: "Deletion of Art Failed"
                }) 
              }
            );
        }
    }).catch(error => {
        res.send({
            status: false,
            message: "Error validiting artist"
        })
    })
}

function removeNUlls(){
    Models.Orders.destroy({where:{artId: null}})
    .then(function(rowDeleted){
        console.log("Rows deleted => " + rowDeleted);
    }, function(err){
        console.log(err); 
    }
    )

}