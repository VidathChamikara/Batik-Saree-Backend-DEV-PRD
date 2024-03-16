const mongoose = require("mongoose");
const upload = require("../utils/multerConfig"); // Import Multer configuration

require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

// POST function to handle image upload
const uploadImage = upload.fields([
  { name: "layer1Img", maxCount: 1 },
  { name: "layer2Img", maxCount: 1 },
  { name: "layer3Img", maxCount: 1 },
]); // Fields specifies the form fields for each image

const postImage = async (req, res) => {
  try {
    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Get file paths from req.files object
      const { layer1Img, layer2Img, layer3Img } = req.files;

      // Save file paths to the database
      const kandyan = new Kandyan({
        modelno: req.body.modelno,
        layer1Img: layer1Img[0].path, // Save the file path for layer1Img
        layer2Img: layer2Img[0].path, // Save the file path for layer2Img
        layer3Img: layer3Img[0].path, // Save the file path for layer3Img
      });

      const savedKandyan = await kandyan.save();

      res.status(201).json(savedKandyan);
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { postImage };
