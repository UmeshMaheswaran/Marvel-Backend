const express = require("express");

const router = express.Router();

const { default: axios } = require("axios");

router.get("/comic/:comicsId", async (req, res) => {
  try {
    console.log("je suis dans ma route");
    const comicsId = req.params.comicsId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicsId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
