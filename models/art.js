const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Art = sequelize.define('arts',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    onSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Art;