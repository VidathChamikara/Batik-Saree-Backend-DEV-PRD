const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // Set your upload destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)  // Set filename (you can adjust as needed)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
