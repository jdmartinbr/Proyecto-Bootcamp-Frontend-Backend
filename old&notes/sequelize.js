// User.findOrCreate({where: {firstname: 'pepe'}, defaults: {lastname: 'grillo'}})
//     .spread(function (user, created) {
//         console.log(user.get({
//             plain: true
//         }));
//         console.log(created)
//     });
// User.findAndCountAll();
// User.findAll({limit:3}).then(user=>{res.send(user)});
// User.findAll({offset:10}).then(user=>{res.send(user)});
// User.findAll({order:[['id','ASC']]}).then(user=>{res.send(user)});
// User.findAll({group:[[]]}).then(user=>{res.send(user)});
// User.max('id').then(max=>console.log(max));
// User.min('id').then(min=>console.log(min));
// User.sum('id').then(sum=>console.log(sum));
// User.create({'firstname': 'juan'}).then(user=>{res.send(user)});
// User.bulkCreate([user1, user2]).then(('No devuelve nada'));
// User.findOne().then(user=>{
//     user.updateAttributes({'atributos': 'nuevo'})
// });
// User.update({});
// User.destroy({where:{firstname: 'Xavi'}}).then(deleted=> {
//     res.send(deleted)
// //    delete devuelve 0 o 1
// });