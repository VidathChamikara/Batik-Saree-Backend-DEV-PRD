const mongoose = require("mongoose");

require("../model/contact");
const Contact = mongoose.model("Contact");

const postMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new Contact instance
    const newContact = new Contact({ name, email, message });

    // Save the new contact to the database
    await newContact.save();

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

module.exports = {
  postMessage,
};
