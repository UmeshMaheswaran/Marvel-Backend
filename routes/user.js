const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/users/signup", async (req, res) => {
  try {
    console.log(req.body);

    const newUser = new User({
      email: String,
      account: {
        username: String,
      },
      token: String,
      hash: String,
      salt: String,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
