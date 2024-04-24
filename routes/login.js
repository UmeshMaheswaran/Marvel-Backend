const express = require("express");
const router = express.Router();

router.post("/users/login", async (req, res) => {
  try {
    console.log(req.body);

    const newLogin = new Login({
      email: req.body.email,
      account: {
        usernme: req.body.username,
      },
      token: String,
      hash: String,
      salt: String,
    });
    await newLogin.save();
    res.statut(201).json(newLogin);
  } catch (error) {}

  res.status(500).json({ message: error.message });
});

module.exports = router;
