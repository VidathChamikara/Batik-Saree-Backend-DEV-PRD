const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig"); 

const connectDatabase = require("../dbConnection");
const {
     uploadImage, getKandyanData
} = require("../controller/kandyanController");

router.post('/upload', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]), uploadImage);
router.get("/getKandyanData",  getKandyanData);


module.exports = router;