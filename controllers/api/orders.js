const Models = require('../../util/models');
const emailMsg = require('../../util/emailMsg');
const Notification =require('../../notification/addNotification');
const { Op } = require("sequelize");
const axios = require('axios');
const { addPayment } = require('../../util/addPayment');

const cancelOtherOrders = async (artId) => {

    await Models.Orders.update(
        {orderStatus: "rejected"},
        {
            where: {
                artId: artId,
               orderStatus: {
                   [Op.ne]: "pending"
               } 
            }
        }
    ).then(update => {
        console.log("Update cancel =======>");
    })
    .catch(error => {
        console.log("Update cancel =======>" + error);
    })

    await Models.Art.update(
        {onSale: false},
        {
            where:{
                id: artId
            }
        }
    ).then(update => {
        console.log("Update Art sale =======>");
    })
    .catch(error => {
        console.log("Update Art sale =======>" + error);
    })

}

exports.getOrdersForArtist = (req, res, next) => {
    const username = req.params.username;

    Models.Artist.findOne({
        where:{userId: username},
    }).then(artist => {
        if(artist){
            artist.getOrders({
                include: [{
                    model: Models.Collector, 
                    include: [{
                        model:Models.User,
                        include: [Models.Address],
                        attributes: {exclude: ['password']}
                    }]}, 
                    Models.Art,
                ]
            })
            .then(orders => {
                res.send({status:true, orders: orders, message:"uccessfully fetched"});
            })
        }else{
            res.send({status: false, message: "Artist Doesn't Exists"});
        }
    }).catch(err => {
        console.log(err);
        res.send({status: false, message: "Error occured while fetching"})
    })
}

exports.getOrdersForCollector = (req, res, next) => {
    const username = req.params.username;

    Models.Collector.findOne({
        where:{userId: username},
    }).then(collector => {
        if(collector){
            collector.getOrders({
                include: [{
                    model: Models.Artist, 
                    include: [{
                        model:Models.User,
                        include: [Models.Address],
                        attributes: {exclude: ['password']}
                    }]},
                    {
                        model: Models.Collector, 
                        include: [{
                            model:Models.User,
                            include: [Models.Address],
                            attributes: {exclude: ['password']}
                        }]
                    }, 
                    Models.Art,
                    
                ]
            })
            .then(orders => {
                res.send({status:true, orders: orders, message:"Successfully fetched"});
            })
        }else{
            res.send({status: false, message: "Collector Doesn't Exists"});
        }
    }).catch(err => {
        console.log(err);
        res.send({status: false, message: "Error occured while fetching"})
    })
}

exports.postOrderAccept = (req, res, next) => {

    const orderId = req.body.orderId;
    const username = req.body.username;
    const shippingCharge = req.body.shippingCharge
    let order;

    Models.Artist.findOne({where: {
        userId: username
    }})
    .then(artist => {
        if(artist){
            Models.Orders.findByPk(orderId, {
                include: [Models.Art]
            }).then(fetchedOrder => {
                if(fetchedOrder){
                    if(fetchedOrder.orderStatus == "waiting"){
                        order = fetchedOrder;
                        fetchedOrder.orderStatus = "pending";
                        fetchedOrder.shippingCharge = shippingCharge;
                        fetchedOrder.save();

                        artist.artsOnSale = parseInt(artist.artsOnSale) - 1;
                        artist.save();

                        cancelOtherOrders(fetchedOrder.artId);

                        Models.Collector.findByPk(order.collectorId, 
                            {include: [Models.User]})
                        .then(collector => {
                            console.log(collector.user.name);
                            console.log(order.art.name);
                            emailMsg.OrderAccepted(collector.user.email, fetchedOrder.art.name);
                            Notification.orderAccepted(collector.user.id, fetchedOrder.art.name, fetchedOrder.amount);
                            res.send({status: true, message: "You will be notified when payment ha been made"});
                        }).catch(error=>{
                            res.send({status: false, message: "Failed to accept order"});
                            console.log(error);
                        })
                    }else{
                        res.send({status: false, message: "The order has already been accepted/canceled"})
                    }
                    
        
                }else{
                    res.send({status: false, message: "The order doesn't exists!! \nRefresh and Try again!!"})
                }
            })
            .catch(error => {
                console.log(error);
                res.send({status: false, message: "Error occured while processing"})
            })
        }else{
            res.send({status: false, message: "Unidentidied user"});
        }
    })
    .catch(error => {
        console.log(error);
        resconst.send({status: false, message: "Error occured while processing"})
    })

}

exports.postOrderDecline = (req, res, next) => {

    const orderId = req.body.orderId;
    const username = req.body.username;
    // const orderId = 1;
    let order;

    Models.Artist.findOne({where: {
        userId: username
    }})
    .then(artist => {
        if(artist){
            Models.Orders.findByPk(orderId, {
                include: [Models.Art]
            }).then(fetchedOrder => {
                if(fetchedOrder){
                    if(fetchedOrder.orderStatus != "rejected" && fetchedOrder.orderStatus != "completed"){
                        order = fetchedOrder
                        fetchedOrder.orderStatus = "rejected"
                        fetchedOrder.save();
            
                        Models.Collector.findByPk(order.collectorId, 
                            {include: [Models.User]})
                        .then(collector => {
                            console.log(collector.user.name);
                            console.log(order.art.name);
                            emailMsg.OrderDeclined(collector.user.email, fetchedOrder.art.name);
                            Notification.orderDeclined(collector.user.id, fetchedOrder.art.name, fetchedOrder.amount);
                            res.send({status: true, message: "Order Rejected Succesfully"});
                        }).catch(error=>{
                            res.send({status: true, message: "Order rejection failed Try Again!!!!"})
                            console.log(error);
                        })
                    }else{
                        res.send({status: false, message: "Order has already been canceled/completed"})                
                    }
                }else{
                    res.send({status: false, message: "No order found \n Try Again!!"})
                }
            }).catch(error => {
                console.log(error);
                res.send({status: false, message: "Error occured while processing"})
            })
        }else{
            res.send({status: false, message: "Unidentified User"})
        }
    })
    .catch(error => {
        console.log(error);
        res.send({status: false, message: error})
    })

}

exports.postOrderCancel = (req, res, next) => {

    const orderId = req.body.orderId;
    const username = req.body.username;
    let order;

    Models.Collector.findOne({where: {
        userId: username
    }})
    .then(collector => {
        if(collector){
            Models.Orders.findByPk(orderId, {
                include: [Models.Art]
            }).then(fetchedOrder => {
                if(fetchedOrder){
                    if(fetchedOrder.orderStatus != "canceled" && fetchedOrder.orderStatus != "completed"){
                        order = fetchedOrder
                        fetchedOrder.orderStatus = "canceled"
                        fetchedOrder.save();
            
                        Models.Artist.findByPk(order.artistId, 
                            {include: [Models.User]})
                        .then(artist => {
                            emailMsg.OrderCancled(artist.user.email, fetchedOrder.art.name, username);
                            Notification.orderCanceled(artist.user.id, fetchedOrder.art.name, fetchedOrder.amount);
                            res.send({status: true, message: "Order Canceled Succesfully"});
                        }).catch(error=>{
                            res.send({status: false, message: "Order cancelation failed Try Again!!!!"})
                            console.log(error);
                        })
                    }else{
                        res.send({status: false, message: "Order has already been canceled/completed"})                
                    }
                }else{
                    res.send({status: false, message: "No order found \n Try Again!!"})
                }
            }).catch(error => {
                console.log(error);
                res.send({status: false, message: "Error occured while processing"})
            })
        }else{
            res.send({status: false, message: "Unidentified User"})
        }
    })
    .catch(error => {
        console.log(error);
        res.send({status: false, message: error})
    })

}


exports.getOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;

    Models.Orders.findByPk(orderId, {
        include:[
            {model: Models.Art},
            {model:Models.Collector, include:[Models.User]},
            {model: Models.Artist, include: [Models.User]}
        ]
    })
    .then(order => {
        if(order){
            res.send({
                status: true,
                order: order,
                errormessage: null
            })
        }else{
            res.send({
                status: false,
                order: null,
                errormessage: "No order"
            })
        }
    }).catch(error => {
        res.send({
            status: false,
            order: null,
            errormessage: error
        })
    });
}

exports.postPayment = (req, res, next) => {

    orderId = req.body.orderId;
    const username = req.body.username;
    const paymentToken = req.body.paymentToken;
    const paymentAmount = req.body.paymentAmount;
    let order;

    let data = {
        "token": paymentToken,
        "amount": paymentAmount*100
    };

    let config = {
        headers: {'Authorization': 'Key test_secret_key_1357561cbf3142d993a402f3dda70167'}
    };

    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(responses => {
        console.log("Payment Verified"+responses.data);

        Models.Collector.findOne({
            where: {
                userId:username
            },
            include: [Models.User]
        })
        .then(collector => {
            if(collector){
                Models.Orders.findByPk(orderId, {
                    include: [
                        Models.Art
                    ]
                }).then(fetchedOrder => {
                    if(fetchedOrder){
                        if(fetchedOrder.orderStatus == "pending"){
                            order = fetchedOrder;
                            fetchedOrder.orderStatus = "completed";
                            fetchedOrder.paymentToken = paymentToken;
                            fetchedOrder.save();
            
                            Models.Artist.findByPk(order.artistId, 
                                {include: [Models.User]})
                            .then(artist => {
                                emailMsg.PaymentReceived(artist.user.email, collector.user.email, fetchedOrder.art.name, paymentAmount, collector.userId);
                                Notification.paymentReceived(artist.userId, fetchedOrder.art.name,paymentAmount, collector.user.id);
                                res.send({status: true, message: "Payment Added"});
                                addPayment(artist.id, paymentAmount);
                                artist.artsSold = parseInt(artist.artsSold) + 1;
                                artist.save();
                            }).catch(error=>{
                                res.send({status: false, message: "Failed to add payment.\n Please notifiy if money has been deducted"});
                                console.log(error);
                            })
                        }else{
                            res.send({status: false, message: "Sorry You cannot make payment for this order.\n Please notify to receive your payment back"})
                        }
                        
            
                    }else{
                        res.send({status: false, message: "The order doesn't exists!! \nRefresh and Try again!!"})
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.send({status: false, message: "Error occured while processing"})
                })
            }else{
                res.send({status: false, message: "Unidentidied user"});
            }
        })
        .catch(error => {
            console.log(error);
            resconst.send({status: false, message: "Error occured while processing"})
        })

    })
    .catch(error => {
        console.log("Payment error ======> " +error);
        res.send({status:false, message: "Payment verification failed"});
    });

}

exports.checkOrderAvailability = (req, res, next) => {

    orderId = req.params.orderId

    Models.Orders.findByPk(orderId, {
        include: [
            Models.Art,
        ]
    }).then(fetchedOrder => {
        if(fetchedOrder){
            if(fetchedOrder.orderStatus == "pending"){
                
                res.send({status: true, message: "Payment Available"});
            
            }else{
                res.send({status: false, message: "Sorry You cannot make payment for this order."})
            }
        }else{
            res.send({status: false, message: "The order doesnt exists!! \nRefresh and Try again!!"})
        }
    })
    .catch(error => {
        console.log(error);
        res.send({status: false, message: "Error occured while processing"})
    })

}

exports.getTopOrdersForArt = (req, res, next) => {

    const artId = req.params.artId;

    Models.Orders.findOne({
        where: {
            artId: artId
        },
        include: [{model: Models.Collector, include: [Models.User]}],
        order:[['amount', 'DESC']]
    })
    .then(orders => {
        if(orders){
            res.send({
                status: true,
                data: orders,
                errorMessage: null
            })
        }else{
            res.send({
                status: false,
                data: null,
                errorMessage: "No order yet"
            })
        }

    })
    .catch(error => {
        console.log("Top Orders =======> " + error)
        res.send({statu: false, data: null, errorMessage: error})
    })

}

exports.getOrdersForArt = (req, res, next) => {

    const artId = req.params.artId;
    const username = req.params.collectorId

    Models.Collector.findOne({
        where: {
            userId:username
        }
    }).then(collector => {
        const collectorId = collector.id;

        Models.Orders.findOne({
            where: {
                artId: artId,
                collectorId: collectorId
            },
            include: [{model: Models.Collector, include: [Models.User]}]
        })
        .then(orders => {
            if(orders){
                res.send({
                    status: true,
                    data: orders,
                    errorMessage: null
                })
            }else{
                res.send({
                    status: false,
                    data: null,
                    errorMessage: "No orders found"
                })
            }
        }).catch(error => {
            console.log("Top Orders =======> " + error)
            res.send({statu: false, data: null, errorMessage: error})
        })

    }).catch(error => {
        console.log(error);
    })

}