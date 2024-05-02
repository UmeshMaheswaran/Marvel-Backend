const express = require("express");
const router = express.Router();

const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/users/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((username, email)) {
      const user = await User.findOne({ email: email });

      if (user === null) {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);
        console.log(req.body);

        const newUser = new User({
          email: email,
          account: {
            username: username,
          },
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();

        res.json({
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.status(400).json({ error: "Email already used" });
      }
    } else {
      res.status(400).json({ error: "Username is missing " });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const newHash = SHA256(req.body.password + user.salt).toString(encBase64);

      if (newHash === user.hash) {
        res.json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
