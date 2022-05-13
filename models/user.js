const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    gender:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    dob:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: true
    },
    userType:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;