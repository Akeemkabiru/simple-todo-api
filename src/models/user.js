const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    select: false, //wont show in output but databasee
  },
  photo: String,
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//crearte a virtual field called confirmpassword which will not be stored in the database
userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

//i want to hash the password before saving to database
userSchema.pre("save", async function (val) {
  this.password = await bcrypt.hash(this.password, 12);
});

//instance method to handle the password changed
userSchema.methods.ChangedPasswordAfer = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changeTimeStamp > JWTTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
