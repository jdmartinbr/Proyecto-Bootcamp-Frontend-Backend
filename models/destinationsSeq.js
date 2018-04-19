const SEQUELIZE = require('sequelize');
let sequelize = require('../connection/sequelizeConnection');

const Destinos = sequelize.define('destinos', {
   city: {
       type: SEQUELIZE.STRING(45)
   },
   country: {
       type: SEQUELIZE.STRING(45)
   },
   price: {
       type: SEQUELIZE.FLOAT
   },
   image: {
       type: SEQUELIZE.STRING(45)
   },
   type: {
       type: SEQUELIZE.STRING(20)
   },
   description: {
       type: SEQUELIZE.STRING(45)
   },
   active: {
       type: SEQUELIZE.INTEGER(1)
   }
});

module.exports = Destinos;


