const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ViewedItems = sequelize.define('viewedItems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    viewedAt: {
        type: Sequelize.DATE,
        allowNull : false,
    }
},
{
    updatedAt: false
})

module.exports = ViewedItems;