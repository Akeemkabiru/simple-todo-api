const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    required: true,
    type: String,
  },
  photo: String,
});

exports.User = mongoose.model("User", userSchema);
