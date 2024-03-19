const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {
    modelno: String,
    layer1Img: String,    
  },
  {
    collection: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);