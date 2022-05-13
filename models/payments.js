const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Payment = sequelize.define('payment', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    received_amount: {
        type: Sequelize.INTEGER,
    },
    taxAmount: {
        type: Sequelize.INTEGER,
    },
    receivableAmount :{
        type:Sequelize.INTEGER,
    }
})

module.exports = Payment;