const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
    postImage, getKandyanData
} = require("../controller/kandyanController");

router.post("/postImage",  postImage);
router.get("/getKandyanData",  getKandyanData);


module.exports = router;