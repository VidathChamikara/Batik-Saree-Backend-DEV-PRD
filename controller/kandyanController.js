const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

require("../model/kandyan");
const KandyanInfo = mongoose.model("KandyanInfo");

// POST function to handle image upload

const uploadImage = async (req, res) => {
  const { modelno, layer1Img } = req.body;

  try {
    if (!layer1Img) {
      return res.status(400).json({ error: "Please provide three images" });
    }
    const result = await cloudinary.uploader.upload(layer1Img, {
      folder: "kandyan",
      // width: 300,
      // crop: "scale"
    });
    const kandyan = await KandyanInfo.create({
      modelno,
      layer1Img: {
        public_id: result.public_id,
        url: result.secure_url,
      }
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send({ error: "An error occurred while uploading the image." });
  }
};

const getKandyanData = async (req, res) => {
  try {
    const kandyanData = await KandyanInfo.find({}).collation({}); // Fetch all data from the Kandyan collection

    res.status(200).json(kandyanData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadImage, getKandyanData };
