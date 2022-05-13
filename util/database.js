const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'btyqnfljxipfcpqielak',
    'uifbmf7neww92lrv',
    'zytjhjMQeMIRci2fxH0k',
    {
        dialect: 'mysql',
        host: 'btyqnfljxipfcpqielak-mysql.services.clever-cloud.com',
        port: 3306
    }
);

module.exports = sequelize;