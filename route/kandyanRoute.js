const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig"); 

const connectDatabase = require("../dbConnection");
const {
     uploadImage, getKandyanData, deleteKandyanData, kandyanDataSubmit
} = require("../controller/kandyanController");

router.post('/upload', upload.fields([
    { name: 'layer1image', maxCount: 1 },
    { name: 'layer2image', maxCount: 1 },
    { name: 'layer3image', maxCount: 1 }
  ]), uploadImage);
router.get("/getKandyanData",  getKandyanData);
router.delete("/deleteKandyan/:id", deleteKandyanData);
router.post("/kandyanDataSubmit", kandyanDataSubmit);


module.exports = router;