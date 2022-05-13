const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Collector = sequelize.define('collector', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = Collector;