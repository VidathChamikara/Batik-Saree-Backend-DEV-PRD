const mongoose = require("mongoose");
require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

const cloudinary = require("../utils/cloudinary");


          

async function uploadImage(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { modelno } = req.body; // Assuming you're sending the model number in the request body

    // Save the Cloudinary URL to MongoDB
    const newKandyan = new Kandyan({
      modelno: modelno,
      layer1Img: result.secure_url,
      // Add other layers if needed
    });
    await newKandyan.save();

    res.status(200).json({
      success: true,
      message: 'Uploaded!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error',
    });
  }
}





const getKandyanData = async (req, res) => {
  try {
    const kandyanData = await KandyanInfo.find({}).collation({}); // Fetch all data from the Kandyan collection

    res.status(200).json(kandyanData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {uploadImage, getKandyanData };
