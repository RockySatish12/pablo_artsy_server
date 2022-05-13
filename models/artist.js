const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Artist = sequelize.define('artist', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    panNo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    totalArts: Sequelize.INTEGER,
    artsSold: Sequelize.INTEGER,
    artsOnSale: Sequelize.INTEGER,
    accountVerified: Sequelize.BOOLEAN
});

module.exports = Artist;