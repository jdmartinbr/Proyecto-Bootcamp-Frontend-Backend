const SEQUELIZE = require('sequelize');
let connection = require('../connection/sequelizeConnection');

const User = connection.define('users', {
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

// User.sync({force: false}).then(()=> {
//     return
// });

module.exports = User;


