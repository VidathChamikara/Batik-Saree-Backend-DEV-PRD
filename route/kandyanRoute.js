const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
    uploadImages, getKandyanData
} = require("../controller/kandyanController");

router.post("/uploadImage",  uploadImages);
router.get("/getKandyanData",  getKandyanData);


module.exports = router;