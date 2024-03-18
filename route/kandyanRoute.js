const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
    uploadImage, getKandyanData
} = require("../controller/kandyanController");

router.post("/uploadImage",  uploadImage);
router.get("/getKandyanData",  getKandyanData);


module.exports = router;