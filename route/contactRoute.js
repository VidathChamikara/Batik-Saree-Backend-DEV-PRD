const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
    postMessage,
} = require("../controller/contactController");

router.post("/postMessage",  postMessage);


module.exports = router;