const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://vidathamarasekara99:vidath@cluster0.nxhtdlz.mongodb.net/?retryWrites=true&w=majority";

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
