let usersModel = require('../models/usersModels');
let User = require('../models/testSequelize');
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
        usuario_login: req.body.usuario,
        password_login: req.body.password
    };
    usersModel.login(user, function (err, data, options) {
        if (err) return res.status(500).json(err);
        switch (options) {
            case 1:
                res.render('login', {
                    title: 'Login',
                    layout: 'template',
                    errorUsuario: true
                });
                break;
            case 2:
                res.render('login', {
                    title: 'login',
                    layout: 'template',
                    errorPassword: true
                });
                break;
            case 3:

                req.session.username = data.usuario;
                req.session.isAdmin = data.isAdmin;
                res.redirect('/');
                break;
        }
    })
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
    usersModel.register(user, function (err, data) {
        if (err) return res.status(500).json(err);
        switch (data){
            case 1:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorEmail:true
                });
                break;
            case 3:
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
                    console.log(info);
                    res.redirect('/login')
                });
                break;

        }
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
