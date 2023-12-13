const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // isLoggedIn: {
  //   type: Boolean,
  //   default: false,
  // },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("User", userSchema);
