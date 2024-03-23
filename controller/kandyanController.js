const express = require('express');
const mongoose = require("mongoose");
const upload = require("../middleware/multerConfig"); // Import Multer configuration
const cloudinary = require("../utils/cloudinary");
require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

const uploadImage = async (req, res) => {
  try {
    // Upload image to Cloudinary
    cloudinary.uploader.upload(req.file.path, { folder: 'Batik' },async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
        });
      }

      // Create a new Kandyan document with the Cloudinary image URL
      const newKandyan = new Kandyan({
        image: result.secure_url, // Assuming 'secure_url' contains the Cloudinary image URL
        // Other fields if needed
      });

      // Save the new Kandyan document to the database
      await newKandyan.save();

      // Respond with success message and uploaded image data
      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully!',
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
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
