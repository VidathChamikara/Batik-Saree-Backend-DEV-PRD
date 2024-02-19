const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./dbConnection");
const router = require("./route/userRoute");

app.use(express.json());
app.use(cors());
app.use("/api", router);

connectDatabase();

app.listen(5000, () => {
  console.log("server started");
});
