let Multer = require('multer');

let storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = Multer({storage: storage});

module.exports = upload;