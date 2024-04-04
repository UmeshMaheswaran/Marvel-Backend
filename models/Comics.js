const mongoose = require("mongoose");

const Comics = mongoose.model("Comics", {
  title: String,
  skip: Number,
  limit: Number,
});

module.exports = Comics;
