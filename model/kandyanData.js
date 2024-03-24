const mongoose = require("mongoose");

const KandyanDataScehma = new mongoose.Schema(
  {       
    ModelNo: String, 
    Layer1Color: String,
    Layer2Color: String,
    Layer3Color: String,
    Material: String, 
    Price: String,   
   
  },
  {
    collection: "KandyanData",
  }
);

mongoose.model("KandyanData", KandyanDataScehma);