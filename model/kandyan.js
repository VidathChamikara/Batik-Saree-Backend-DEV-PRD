const mongoose = require("mongoose");

const KandyanScehma = new mongoose.Schema(
  {
    modelno: {
      type: String,
      required: true,
    },
    
    layer1Img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    collation: "KandyanInfo",
  }
);

mongoose.model("KandyanInfo", KandyanScehma);
