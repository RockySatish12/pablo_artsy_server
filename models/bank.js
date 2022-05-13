const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Bank = sequelize.define('bank', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    bank_name: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    acc_number: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    acc_holder_name :{
        type:Sequelize.STRING,
        allowNUll: false
    }
})

module.exports = Bank;