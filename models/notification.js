const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Notification = sequelize.define('notification', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    notificationStatus: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    image_url :{
        type:Sequelize.STRING,
        allowNUll: false
    }
})

module.exports = Notification;