const express = require('express');
const mongoose = require("mongoose");
const upload = require("../middleware/multerConfig"); // Import Multer configuration
const cloudinary = require("../utils/cloudinary");
require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

const uploadImage = async (req, res) => {
  try {
   
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
      layer1image: uploadedUrls[0],
      layer2image: uploadedUrls[1],
      layer3image: uploadedUrls[2],
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

const deleteKandyanData = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Find the document by ID and delete it
    const deletedKandyan = await Kandyan.findByIdAndDelete(id);

    if (!deletedKandyan) {
      return res.status(404).json({ error: "KandyanInfo not found" });
    }

    res.status(200).json({ success: true, message: "KandyanInfo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadImage, getKandyanData, deleteKandyanData};
