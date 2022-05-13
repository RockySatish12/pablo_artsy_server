const Models = require('../util/models')

exports.orderReceived = async (artistId, artName, username, amount) => {

    Models.Artist.findByPk(artistId, {
        include: [Models.User]
    })
    .then(artist => {
        return artist.getUser();
    })
    .then(user => {
        user.createNotification({
            content: `<h5>Order Received</h5> <b>For:-</b> ${artName}\n<br><b>By:-</b> ${username}\n<br><b>Offered:-</b> NPR ${amount}`,
            notificationStatus: 'unread',
            image_url: 'https://res.cloudinary.com/du7pn6pke/image/upload/v1649298403/pabloartsy/receiver_ew6lae.png'
        })
        console.log("Notification Added");
    })
    .catch(error => {
        console.log(error);

    })
}

exports.orderAccepted = async (userId, artName, amount) => {
    
    Models.User.findByPk(userId)
    .then(user => {
        user.createNotification({
            content: `<h5>Order Accepted</h5> <b>For:-</b> ${artName}\n<br><b>By:-</b> ${userId}\n<br><b>Price:-</b> NPR ${amount}`,
            notificationStatus: 'unread',
            image_url: 'https://res.cloudinary.com/du7pn6pke/image/upload/v1649298403/pabloartsy/order_ywgf5k.png'
        })
        console.log("Notification Added");
    })
    .catch(error => {
        console.log("Notification =========>" +error);
        
    })
}

exports.orderCanceled = async (userId, artName, amount) => {
    
    Models.User.findByPk(userId)
    .then(user => {
        user.createNotification({
            content: `<h5>Order Canceled</h5> <b>For:-</b> ${artName}\n<br><b>By:-</b> ${userId}\n<br><b>Price:-</b> NPR ${amount}`,
            notificationStatus: 'unread',
            image_url: 'https://res.cloudinary.com/du7pn6pke/image/upload/v1649298403/pabloartsy/cancelled_tp4thn.png'
        })
        console.log("Notification Added");
    })
    .catch(error => {
        console.log("Notification =========>" +error);
        
    })

}

exports.orderDeclined = async (userId, artName, amount) => {
    
    Models.User.findByPk(userId)
    .then(user => {
        user.createNotification({
            content: `<h5>Order Declined</h5> <b>For:-</b> ${artName}\n<br><b>By:-</b> ${userId}\n<br><b>Price:-</b> NPR ${amount}`,
            notificationStatus: 'unread',
            image_url: 'https://res.cloudinary.com/du7pn6pke/image/upload/v1649298403/pabloartsy/cancelled_tp4thn.png'
        })
        console.log("Notification Added");
    })
    .catch(error => {
        console.log("Notification =========>" +error);
        
    })

}

exports.paymentReceived = async (username, artName, paymentAmount, collectorName) => {
    Models.User.findByPk(username)
    .then(user => {
        user.createNotification({
            content: `<h5>Payment Received</h5> <b>For:-</b> ${artName}\n<br><b>By:-</b> ${collectorName}\n<br><b>Amount:-</b> NPR ${paymentAmount}`,
            notificationStatus: 'unread',
            image_url: 'https://res.cloudinary.com/du7pn6pke/image/upload/v1649298403/pabloartsy/receive-money_xut1ug.png'
        })
        console.log("Notification Added");
    })
    .catch(error => {
        console.log("Notification =========>" +error);
        
    })
}