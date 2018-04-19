const SEQUELIZE = require('sequelize');
const sequelizeData = require('../config/sequelizeData');

const sequelize = new SEQUELIZE (sequelizeData.database, sequelizeData.user, sequelizeData.password, {
    host: sequelizeData.host,
    dialect: sequelizeData.dialect,
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(()=> {
        console.log('Connection sequelize ok')
    })
    .catch(err => {
        console.error('Conecction sequelize error', err)
    });

module.exports = sequelize;

