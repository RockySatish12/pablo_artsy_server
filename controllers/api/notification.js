const Models = require('../../util/models')

exports.getNotification = (req, res, next) => {
    const username = req.params.username;

    Models.User.findByPk(username)
    .then(user => {
        if(user){
            console.log("Notification ========> user" + user)
            return user.getNotifications({
                order:[['createdAt', 'DESC']]
            })
        }else{
            return [];
        }
    })
    .then(notifications => {
        if(notifications.length > 0){
            console.log("Notification =========>" + notifications);
            res.send({
                status: true,
                data: notifications,
                errorMessage: "Error occurred while fetching"
            });    
        }else{
            console.log("Notification =========> No Notifications" );
            res.send({
                status: true,
                data: notifications,
                errorMessage: "No Notifications"
            });    
        }
    })
    .catch(error => {
        console.log("Notification =========>" + error);
        res.send({
            status: true,
            data: null,
            errorMessage: "Error occurred while fetching"
        });
    })

}