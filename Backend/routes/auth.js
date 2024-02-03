const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/User");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hashSync(password, salt);
    const newuser = new user({ username, email, password: hashedpassword });
    const savedUser = await newuser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    console.log(req.body, "hello");
    return res.status(500).json({ err: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body, "wsrr");
    const User = await user.findOne({ email: req.body.email });
    console.log(User.password, User._doc);
    if (!User) {
      return res.status(404).json("no user");
    }
    const match = await bcrypt.compare(req.body.password, User.password);
    if (!match) {
      return res.status(401).json("wrong credentials");
    }
    const token = jwt.sign(
      { _id: User._id, username: User.username, password: User.password },
      process.env.SECRET,
    );
    const { password, ...info } = User._doc;
    const options = {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    };
    return res.cookie("token", token, options).json(info).status(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message, data: "not registered" });
  }
});

//Logout
router.get("/logout", async (req, res) => {
  try {
    return res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("user logged out succesfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json("token not found");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(404).json(err.message);
    }
    console.log(data);
    return res.status(200).json(data);
  });
});

module.exports = router;
