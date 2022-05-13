const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const RecentViews = sequelize.define('recentView', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = RecentViews;