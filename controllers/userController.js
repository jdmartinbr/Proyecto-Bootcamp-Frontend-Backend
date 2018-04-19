let User = require('../models/usersSeq');
let Email = require('../config/emailConfig');
let bcrypt = require('bcrypt-nodejs');

let userController = {};

userController.getLogin = function (req, res, next) {
    if (req.session.username) {
        next(err);
    }
    res.render('login.hbs', {
        title: 'Login',
        layout: 'template'
    })
};

userController.login = function (req, res){
    let user = {
        usuario: req.body.usuario,
        password: req.body.password
    };
    User.findOne({where: {usuario: user.usuario}}).then(userData=>{
        console.log(userData);
        if (userData === null) {
            res.render('login', {
                title: 'Login',
                layout: 'template',
                errorUsuario: true
            });
        };
        bcrypt.compare(user.password, userData.dataValues.hash, function(err, comp) {
            console.log(err);
            console.log(comp);
            if (!comp) {
                res.render('login', {
                    title: 'login',
                    layout: 'template',
                    errorPassword: true
                });
            } else {
                req.session.username = userData.dataValues.usuario;
                req.session.isAdmin = userData.dataValues.isAdmin;
                res.redirect('/');
            }
        });

    });
};

userController.getRegistro = function (req, res) {
    if (req.session.username) {
        next(err);
    }
    res.render('registro.hbs', {
        title: 'Registro',
        layout: 'template',
    })
};

userController.registro = function (req, res) {
    let hash = bcrypt.hashSync(req.body.password_sec);
    let user = {
        usuario: req.body.usuario,
        email: req.body.email,
        hash: hash
    };
    let encodeHash = encodeURIComponent(hash);
    User.findAll({where: {$or: [{email: {$eq: user.email}}, {usuario: {$eq: user.usuario}}]}})
        .then(function (userData) {
        if (userData.length > 1) {
            return res.render('registro', {
                title: 'Registro',
                layout: 'template',
                errorUsuario:true
            });
        }
        if (userData.length === 1) {
            if (userData[0].dataValues.usuario === user.usuario) {
                return res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorUsuario:true
                });
            }
            if (userData[0].dataValues.email === user.email) {
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorEmail:true
                });
            }
        }
        User.create(user).then(userCreated => {
            let message = {
                to: req.body.email,
                subject: 'Activation email',
                html: '<p>Hello, you have to click the link to activate your account.</p><a href="http://localhost:3000/activate-account/'+ encodeHash+'">Activate account</a>'
            };
            Email.transporter.sendMail(message, (err, info) => {
                if(err){
                    res.status(500).send(err, message);
                    return
                }
                Email.transporter.close();
                res.redirect('/login')
            });
        });
    });
};

userController.activateAccount = function (req, res, next) {
    let decodedHash = decodeURIComponent(req.params.hash);
    User.findOne({ where: {hash: decodedHash} }).then(userData => {
        if(!userData) return res.redirect('/');
        User.update(
            { active: 1},
            { where: { hash: req.params.hash } }
        )
            .then(result =>
                res.redirect('/login')
            )
    });
};

userController.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login');
};

userController.getRecoveryHash = function (req, res, next) {
    User.findOne({ where: {email: req.body.email} }).then(userData => {
        if(!userData) return res.redirect('/');
        console.log(userData);
        let encodeHash = encodeURIComponent(userData.hash);
        let message = {
            to: userData.email,
            subject: 'Recovery password email',
            html: '<p>Hola es una prueba</p><a href="http://localhost:3000/newpassword/'+ encodeHash+'">Recuperar contraseña</a>'
        };
        Email.transporter.sendMail(message, (err, info) => {
            if(err){
                res.status(500).send(err, message);
                return
            }
            Email.transporter.close();
            console.log(info);
            res.redirect('/login')
        });
    });
};

userController.newpasswordView = function (req, res, next) {
    let decodeHash = decodeURIComponent(req.params.hash);
    User.findOne({ where: {hash: decodeHash} }).then(userData => {
        if (!userData) return res.redirect('/');
        res.render('newPassword', {
            title: 'New Password',
            layout: 'template',
            userData
        })
    });
};

userController.setNewPassword = function (req, res, next) {
    let newHash = bcrypt.hashSync(req.body.password);
    User.update(
        { hash: newHash},
        { where: { usuario: req.body.usuario } }
    )
        .then(result =>
            res.redirect('/login')
        )
};

module.exports = userController;

