const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/users/signup", async (req, res) => {
  const SHA256 = require("crypto-js/sha256");
  const encBase64 = require("crypto-js/enc-base64");
  const uid2 = require("uid2");

  const password = req.body.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(16);

  try {
    console.log(req.body);

    const newUser = new User({
      email: req.body.email,
      account: {
        username: req.body.username,
      },
      token: token,
      hash: hash,
      salt: salt,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
