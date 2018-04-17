const SEQUELIZE = require('sequelize');

const sequelize = new SEQUELIZE ('travel_agency', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
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

