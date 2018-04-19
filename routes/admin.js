let express = require('express');
let router = express.Router();
let winston = require('../config/winston');
let destinationsModel = require('../old&notes/oldfiles/destinationsModels');
let homeController = require('../controllers/homeController')
let checkAccessUser = require('../middelwares/sessionSegurity');

// let Multer = require('multer');
//
// let storage = Multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });
//
// let upload = Multer({storage: storage});

let upload = require('../config/multer');

router.get('/', checkAccessUser, function(req, res, next) {
    homeController.paginationDestinos(req, res, next);
});

router.get('/users', checkAccessUser, function(req, res, next) {
    homeController.paginationUsers(req, res, next);
});

router.get('/delete/:id', function(req, res, next) {
    let reqId = req.params.id;
    destinationsModel.deleteDestino(reqId, function (err, dest) {
       if (err) return res.status(500).json(err);
       destinos = dest;
          res.redirect('/admin');
    });
});

// router.get('/active/:id', function(req, res, next) {
//     let reqId = req.params.id;
//     destinationsModel.updateActive(reqId, function (err, dest) {
//         if (err) return res.status(500).json(err);
//         destinos = dest;
//         res.redirect('/admin');
//     });
// });

router.post('/edit', function(req, res, next) {
    let destination = {
        city: req.body.city,
        country: req.body.country,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        description: req.body.description,
        active: req.body.active - 1 ,
    };
    let id = req.body.id;
    destinationsModel.editDestination(destination, id, function (err, row) {
        if (err) return res.status(500).json(err);
        res.redirect('/admin');
    });
});

router.post('/add', upload.single('image'), function(req, res, next) {
    let urlImage = req.file.path.replace(/\\/g, "/");
    let destination = {
        city: req.body.city,
        country: req.body.country,
        price: req.body.price,
        image: "/"+urlImage,
        type: req.body.type,
        description: req.body.description,
        active: req.body.active
    };
    destinationsModel.addDestination(destination, function (err, dest) {
        if (err) return res.status(500).json(err);
        res.redirect('/admin');
    });
});

router.get('/flashrecieve', function(req, res){
    res.render('login.hbs', {
         layout: 'template',
         messages: req.flash('info')
    });
});

router.get('/flashcreate', function(req, res, next){
    req.flash('info', 'Sesion flash creada');
    res.redirect('/admin/flashrecieve')
});

module.exports = router;
