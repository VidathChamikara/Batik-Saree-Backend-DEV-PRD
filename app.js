const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./dbConnection");
const userrouter = require("./route/userRoute");
const contactrouter = require("./route/contactRoute");
const kandyanrouter = require("./route/kandyanRoute");

app.use(express.json());
app.use(cors());
app.use("/api/user", userrouter);
app.use("/api/contact", contactrouter);
app.use("/api/kandyan", kandyanrouter);
app.use('/uploads', express.static('uploads'))

connectDatabase();

app.listen(5000, () => {
  console.log("server started");
});
