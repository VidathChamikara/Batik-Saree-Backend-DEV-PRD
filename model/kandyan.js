const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {    
    image: String, 
    image2: String, 
    image3: String,   
   
  },
  {
    collection: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);