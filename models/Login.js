const mongoose = require("mongoose");

const Login = mongoose.model("Login", {
  email: String,
  account: {
    username: String,
    avatar: Object,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = Login;
