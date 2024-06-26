require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/comics");

const comicsRoutes = require("./routes/comics");
const comicsIdRoutes = require("./routes/comicsId");

const characterIdRoutes = require("./routes/characterid");

const UserRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(comicsRoutes);
app.use(characterIdRoutes);
app.use(comicsIdRoutes);

app.use(UserRoutes);

app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("THE SERVER IS OP");
});
