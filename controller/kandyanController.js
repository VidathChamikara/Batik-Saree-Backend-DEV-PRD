const express = require('express');
const mongoose = require("mongoose");
const upload = require("../middleware/multerConfig"); // Import Multer configuration
const cloudinary = require("../utils/cloudinary");
require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

const uploadImage = async (req, res) => {
  try {
    const { image, image2, image3 } = req.files; // Multer stores uploaded files in req.files

    // Upload images to Cloudinary
    const uploadPromises = [image, image2, image3].map(async (image) => {
      const result = await cloudinary.uploader.upload(image[0].path);
      return result.secure_url;
    });

    // Wait for all uploads to complete
    const uploadedUrls = await Promise.all(uploadPromises);

    // Create a new instance of KandyanInfo with image URLs
    const kandyan = new Kandyan({
      image: uploadedUrls[0],
      image2: uploadedUrls[1],
      image3: uploadedUrls[2],
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
    const kandyanData = await KandyanInfo.find({}).collation({}); // Fetch all data from the Kandyan collection

    res.status(200).json(kandyanData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadImage, getKandyanData };
