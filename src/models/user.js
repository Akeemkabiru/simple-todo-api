const mongoose = require("mongoose");
const crypto = require("crypto");
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
    select: false,
  },
  photo: String,
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});

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

userSchema.methods.generateResetPasswordToken = function () {
  const otp = crypto.randomInt(0, 1000000).toString().padStart(6, "0");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return otp;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
