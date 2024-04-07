const express = require("express");

const router = express.Router();

const { default: axios } = require("axios");

router.get("/comicsid", async (req, res) => {
  console.log("route =>", "/comicsid");

  try {
    const title = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic?apiKey=${process.env.API_KEY}&name=${title}&skip=${skip}&limit=${limit}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
