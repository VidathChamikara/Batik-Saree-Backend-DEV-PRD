const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {       
    layer1image: String, 
    layer2image: String, 
    layer3image: String,   
   
  },
  {
    collection: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);