const Sequelize = require('sequelize');
const SendMail = require('../../util/sendMail')
const sequelize = require('../../util/database');
const Constants = require('../../util/constants')
const NotificationHelper = require('../../notification/addNotification');
const Models = require('../../util/models')


exports.getRecentViews = (req,res,next) => {
    const username = req.params.username
    const limitValue = parseInt(req.params.limitValue);

    Models.Collector.findOne({where: {userId: username}})
    .then(collector => {
        return collector.getRecentView()
    })
    .then(recentViews => {
        if(recentViews){
            return recentViews.getArts({
                limit: limitValue,
                order:[[Sequelize.literal('viewedItems.viewedAt'), 'DESC']]})
        }else{
            return null;
        }
    })
    .then(arts => {
        if(arts){
            res.send({
                "success" : true,
                "data" : arts,
                "errorMessage" : null
            })
        }else{
            res.send({
                "success" : false,
                "data" : null,
                "errorMessage" : "No recent views"
            })
        }
    })
    .catch(err => {
        res.send({
            "success" : false,
            "data" : null,
            "errorMessage" : "No data found"
        })
        console.log(err);
    })

};

exports.postOrderArt = (req, res, next) => {
    const username = req.body.username;
    const jsonArt = req.body.art;
    const artistID = jsonArt.artistId;
    const email = req.body.email;
    const offeredAmount = req.body.offeredAmount
    let collector;

    console.log(jsonArt);

    Models.Collector.findOne({where:{userId: username}})
    .then(fetchCollector => {
        collector = fetchCollector
        return Models.Orders.findOne({where:{
            collectorId: collector.id,
            artId: jsonArt.id
        }})
    }).then(order => {
        if(order){
            if(order.orderStatus === 'canceled'){
                order.amount = offeredAmount;
                order.orderStatus = 'waiting';
                order.save();
                const msg = `You have received an orderfor "${jsonArt.name}"
                    \n Please check the app for order details`
                SendMail.sendMail("Order Received", msg, email);

                NotificationHelper.orderReceived(artistID, jsonArt.name, username, offeredAmount);

                res.send({success: true, message: "You will be notified when artist accepts your order"})
            }else{
                console.log("Already Placed Order");
                res.send({success: false, message: "Already Placed Order"})
            }
        
        }else{
            Models.Orders.create({
                amount: offeredAmount,
                orderStatus: 'waiting',
                collectorId: collector.id,
                artistId: artistID,
                artId: jsonArt.id
            }).then(order => {
                if(order){
                    console.log("Order Creadted");

                    const msg = `You have received an orderfor "${jsonArt.name}"
                    \n Please check the app for order details`
                    SendMail.sendMail("Order Received", msg, email);

                    NotificationHelper.orderReceived(artistID, jsonArt.name, username, offeredAmount);
                    
                    res.send({success: true, message: "You will be notified when artist accepts your order"})
                }else{
                    res.send({success: false, errorMessage: "Failed to place order"})
                }
            })
        }
    }).catch(error => {
        console.log(error);
        res.send({success: false, message: error.message})
    });
}