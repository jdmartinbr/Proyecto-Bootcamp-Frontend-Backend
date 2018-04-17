let destinationsModel = require('../models/destinationsModels');
let homeController = {};

homeController.home = function (req, res) {
    destinationsModel.getDestinos(function (err, destinos) {
        if (err) return res.status(500).json(err);
        res.render('main.hbs', {
            title: 'Geekshubs Travell',
            layout: 'template',
            isAdmin: req.isAdmin,
            isUser: req.isUser,
            destinos: destinos
        })
    });
};

module.exports = homeController;
