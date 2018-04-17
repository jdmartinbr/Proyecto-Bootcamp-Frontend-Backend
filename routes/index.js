let express = require('express');
let router = express.Router();
let usersController = require('../controllers/userController');
let homeController = require('../controllers/homeController');
let checkAccessUser = require('../middelwares/sessionSegurity');

router.get('/a', function (req, res, next) {
    let a = req.session;
    res.send(a);
});

router.get('/', checkAccessUser, function(req, res, next) {
    homeController.home(req, res)
});

router.get('/registro', function(req, res, next) {
    usersController.getRegistro(req, res)
});

router.post('/registro', function(req, res){
    usersController.registro(req, res)
});

router.get('/activate-account/:hash', function(req, res, next){
    usersController.activateAccount(req, res, next)
});

router.get('/login', function(req, res, next) {
    usersController.getLogin(req, res, next)
});

router.post('/login', function (req, res) {
    usersController.login(req, res)
});

router.get('/logout', function (req, res, next) {
    usersController.logout(req, res, next)
});

router.post('/recovery_password', function (req, res, next) {
    usersController.getRecoveryHash(req, res, next)
});

router.get('/newpassword/:hash', function (req, res, next) {
    usersController.newpasswordView(req, res, next);
});

router.post('/newpassword', function (req, res, next) {
    usersController.setNewPassword(req, res, next)
});

// router.get('/newpassword/:hash', function (req, res, next) {
//     User.findOne({ where: {hash: req.params.hash} }).then(userData => {
//         if (!userData) return res.redirect('/');
//         res.render('newPassword', {
//             title: 'New Password',
//             layout: 'template',
//             hash: req.params.hash
//         })
//     });
// });

module.exports = router;
