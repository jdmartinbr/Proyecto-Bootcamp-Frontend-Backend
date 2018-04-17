const SEQUELIZE = require('sequelize');
let sequelize = require('../connection/sequelizeConnection');

// const User = sequelize.define('sequelizes', {
//    firstName: {
//        type: SEQUELIZE.STRING
//    },
//    lastName: {
//        type: SEQUELIZE.STRING
//    }
// });

const User = sequelize.define('users', {
   usuario: {
       type: SEQUELIZE.STRING(45)
   },
   email: {
       type: SEQUELIZE.STRING(45)
   },
   hash: {
       type: SEQUELIZE.STRING(80)
   },
   isAdmin: {
       type: SEQUELIZE.INTEGER(1)
   },
   active: {
       type: SEQUELIZE.INTEGER(1)
   }
});

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

// User.sync({force: false}).then(()=> {
//     return
// });

module.exports = User;


