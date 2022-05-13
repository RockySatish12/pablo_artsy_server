const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Orders = sequelize.define('orders', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNUll: false
    },
    paymentToken: Sequelize.STRING,
    orderStatus: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    shippingCharge: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Orders;