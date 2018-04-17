let express = require('express');
let router = express.Router();
let Path = require('path');
let hbs = require('nodemailer-express-handlebars');
const Email = require('../config/emailConfig');

const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = Multer({storage: storage});

router.get('/file', function (req, res, next) {
    res.render('upload', {
        title: 'Subir archivo',
        layout: 'template',
    })
});

router.post('/file/upload', upload.single('file'), function (req, res, next) {
    console.log(req.file.path);
    res.redirect('/');
    // { fieldname: 'file',
    //     originalname: '0.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: 'public/uploads/',
    //     filename: '0.jpg',
    //     path: 'public\\uploads\\0.jpg',
    //     size: 11671 }
});

router.get('/sendhtml', function (req, res, next) {
    let message = {
        to: 'juandi_paipor@hotmail.com',
        subject: 'Email de prueba',
        html: '<p>Hola es una prueba</p><p><img src="cid:"/></p>'
    };
    Email.transporter.sendMail(message, (err, info) => {
       if(err){
           res.status(500).send(err, message);
           return
       }
       Email.transporter.close();
       console.log(info);
       res.status(200).send('Respuesta "%s"' + info.response)
    });
});

router.get('/sendhbs', function (req, res, next) {
    Email.transporter.use('compile', hbs({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: Path.join(__dirname, '../views/emailTemplates')
    }));
    let message = {
        to: 'juandi_paipor@hotmail.com',
        subject: 'Email de prueba',
        template: 'email',
        context: {
            texto: 'Enviamos una prueba por handlebars'
        },
        attachments: [
            {
            filename: 'paris.jpg',
            path: __dirname + '/paris.jpg',
            cid: 'imagen'
            },
        ]
    };
    Email.transporter.sendMail(message, (err, info) => {
        if(err){
            res.status(500).send(err, message);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response)
    });
});


module.exports = router;
