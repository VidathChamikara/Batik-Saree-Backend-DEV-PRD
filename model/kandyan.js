const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {
    modelno: String,
    layer1Img: String,
    layer2Img: String,
    layer3Img: String,
  },
  {
    collection: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);