const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig"); 

const connectDatabase = require("../dbConnection");
const {
     uploadImage, getKandyanData
} = require("../controller/kandyanController");

router.post('/upload', upload.single('image'), uploadImage); // Handle image upload
router.get("/getKandyanData",  getKandyanData);


module.exports = router;