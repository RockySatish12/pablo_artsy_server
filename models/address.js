const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Address = sequelize.define('address', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    country:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NP'
    },
    province: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    district: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city:{
        type: Sequelize.STRING,
        allowNull: false
    },
    street:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Address;