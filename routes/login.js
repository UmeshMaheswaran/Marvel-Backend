const express = require("express");
const router = express.Router();

const Login = require("../models/Login");

router.post("/users/login", async (req, res) => {
  const SHA256 = require("crypto-js/sha256");
  const encBase64 = require("crypto-js/enc-base64");
  const uid2 = require("uid2");

  const password = req.body.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(16);

  try {
    console.log(req.body);

    const newLogin = new Login({
      email: req.body.email,
      account: {
        usernme: req.body.username,
      },
      token: token,
      hash: hash,
      salt: salt,
    });
    await newLogin.save();
    res.status(201).json(newLogin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
