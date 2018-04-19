let homeController = {};
let paginate = require('express-paginate');
let Destinos = require('../models/destinationsSeq');
let Users = require('../models/usersSeq');

homeController.home = function (req, res) {
    Destinos.findAll().then(destinations => {
        res.render('main.hbs', {
            title: 'Geekshubs Travell',
            layout: 'template',
            isAdmin: req.isAdmin,
            isUser: req.isUser,
            destinos: destinations
        })
    })
    // destinationsModel.getDestinos(function (err, destinos) {
    //     if (err) return res.status(500).json(err);
    //     res.render('main.hbs', {
    //         title: 'Geekshubs Travell',
    //         layout: 'template',
    //         isAdmin: req.isAdmin,
    //         isUser: req.isUser,
    //         destinos: destinos
    //     })
    // });
};

homeController.cart = function (req, res) {
    res.render('cart.hbs', {
        title: 'Geekshubs Travell',
        layout: 'template'
    })
};

homeController.paginationDestinos = function (req, res, next) {
    if(!req.isUser) return res.redirect('/');
    let page = (parseInt(req.query.page) || 1) -1;
    let limit = 3;
    let offset = page * limit;
    Destinos.findAndCountAll({offset: offset, limit: limit})
        .then(destinos => {
            console.log(destinos.count);
            console.log(destinos.rows);
            const currentPage = offset === 0 ? 1 : (offset/limit)+1;
            const totalCount = destinos.count;
            const pageCount = Math.ceil(totalCount /limit);
            const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);
            res.render('adminDestinations.hbs', {
                title: 'Geekshubs Travell',
                destinos: destinos.rows,
                layout: 'template',
                currentPage,
                links: pagination,
                isAdmin: req.isAdmin,
                isUser: req.isUser,
                hasNext: paginate.hasNextPages(pageCount),
                pageCount
            })
        });
};

homeController.paginationUsers = function (req, res, next) {
    if(!req.isUser) return res.redirect('/');
    let page = (parseInt(req.query.page) || 1) -1;
    let limit = 3;
    let offset = page * limit;
    Users.findAndCountAll({offset: offset, limit: limit})
        .then(userData => {
            const currentPage = offset === 0 ? 1 : (offset/limit)+1;
            const totalCount = userData.count;
            const pageCount = Math.ceil(totalCount /limit);
            const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);
            res.render('adminUsers.hbs', {
                title: 'Geekshubs Travell',
                users: userData.rows,
                layout: 'template',
                currentPage,
                links: pagination,
                isAdmin: req.isAdmin,
                isUser: req.isUser,
                hasNext: paginate.hasNextPages(pageCount),
                pageCount
            })
        });
};

module.exports = homeController;
