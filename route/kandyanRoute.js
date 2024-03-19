const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const connectDatabase = require("../dbConnection");
const {
    uploadImage, getKandyanData
} = require("../controller/kandyanController");

router.post("/uploadImage",  upload.single('image'), uploadImage);
router.get("/getKandyanData",  getKandyanData);


module.exports = router;