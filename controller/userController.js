const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET =
  "";

require("../model/userDetails");
const User = mongoose.model("UserInfo");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const plainPassword = password;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email }).collation({});

    if (oldUser) {
      return res.send({ status: "Already Registred" });
    }

    const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
      userType: "General User",
    });

    // Sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // your email
        pass: "", // your password
      },
    });

    const mailOptions = {
      from: "vidathamarasekara99@gmail.com",
      to: newUser.email,
      subject: "Welcome to Batik Saree!",
      text: `Hello ${newUser.username},\n\nYour account has been successfully created.\nYour username : ${newUser.username}\nYour password : ${plainPassword}
        .\nYou can now login with your email and password.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).collation({});
  if (!user) {
    return res.json({ error: "Invalid Username" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
};

const getUserData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const usermail = user.email;
    User.findOne({ email: usermail })
      .collation({})
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
};

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({}).collation({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  getAllUsers,
};
