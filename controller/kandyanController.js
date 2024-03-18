const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

require("../model/kandyan");
const KandyanInfo = mongoose.model("KandyanInfo");

// POST function to handle image upload

const uploadImage = async (req, res) => {
  const { modelno, layer1Img, layer2Img, layer3Img } = req.body;

  try {
    if (!layer1Img || !layer2Img || !layer3Img) {
      return res.status(400).json({ error: "Please provide all three images" });
    }

    const uploadPromises = [layer1Img, layer2Img, layer3Img].map(async (img) => {
      const result = await cloudinary.uploader.upload(img, {
        folder: "kandyan",
        // width: 300,
        // crop: "scale"
      });
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });

    const [layer1, layer2, layer3] = await Promise.all(uploadPromises);

    const kandyan = await KandyanInfo.create({
      modelno,
      layer1Img: layer1,
      layer2Img: layer2,
      layer3Img: layer3,
    });

    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).send({ error: "An error occurred while uploading the images." });
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
