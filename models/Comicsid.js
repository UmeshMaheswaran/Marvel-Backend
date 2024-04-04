const mongoose = require("mongoose");

const Comicsid = mongoose.model("Comicsid", {
  title: String,
  skip: Number,
  limit: Number,
});

module.exports = Comicsid;
