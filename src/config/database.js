require("dotenv").config({ path: `${__dirname}/.env` });
const mongoose = require("mongoose");

function connectDB() {
  const DB = process.env.DB_URI.replace(
    "<db_password>",
    process.env.DB_PASSWORD
  );
  mongoose
    .connect(DB)
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Failed to connect to database"));
}

module.exports = connectDB;
