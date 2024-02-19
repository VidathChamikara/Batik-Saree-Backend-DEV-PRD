const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    username:  String,
    email: String,
    password: String,   
    userType: String,
  },
  {
    collation: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
