const express = require('express');
const mongoose = require("mongoose");
const upload = require("../middleware/multerConfig"); // Import Multer configuration
const cloudinary = require("../utils/cloudinary");
require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

const uploadImage = async (req, res) => {
  try {
    const { modelNo } = req.body; // Assuming modelNo is sent as a text input in the request body
    const { layer1image, layer2image, layer3image } = req.files; // Multer stores uploaded files in req.files

    // Upload images to Cloudinary
    const uploadPromises = [ layer1image, layer2image, layer3image].map(async (image) => {
      const result = await cloudinary.uploader.upload(image[0].path, { folder: 'Batik' });
      return result.secure_url;
    });

    // Wait for all uploads to complete
    const uploadedUrls = await Promise.all(uploadPromises);

    // Create a new instance of KandyanInfo with image URLs
    const kandyan = new Kandyan({
      modelNo: modelNo,
      layer1image: uploadedUrls[0],
      layer2image: uploadedUrls[1],
      layer3image3: uploadedUrls[2],
    });

    // Save the instance to MongoDB
    await kandyan.save();

    res.status(200).json({ success: true, message: 'Images uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getKandyanData = async (req, res) => {
  try {
    const kandyanData = await Kandyan.find({}).collation({}); // Fetch all data from the Kandyan collection

    res.status(200).json(kandyanData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadImage, getKandyanData };
