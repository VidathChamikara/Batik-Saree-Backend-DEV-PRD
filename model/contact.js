const mongoose = require("mongoose");

const contactScehma = new mongoose.Schema(
  {
    name:  String,
    email: String,
    message: String,       
  },
  {
    collation: "contact",
  }
);

mongoose.model("contact", contactScehma);