const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {
    modelno:  String,
    layer1: String,
    layer2: String,   
    layer3: String,
  },
  {
    collation: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);