const mongoose = require("mongoose");


require("../model/kandyan");
const Kandyan = mongoose.model("KandyanInfo");

// POST function to handle image upload

const getKandyanData = async (req, res) => {
  try {
    const kandyanData = await Kandyan.find({}).collation({}); // Fetch all data from the Kandyan collection

    res.status(200).json(kandyanData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { postImage, getKandyanData };
