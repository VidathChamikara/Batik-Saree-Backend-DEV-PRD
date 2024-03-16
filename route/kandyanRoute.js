const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
    postImage,
} = require("../controller/kandyanController");

router.post("/postImage",  postImage);


module.exports = router;