require("dotenv").config({ path: `./src/config/.env` });
const fs = require("fs");
const mongoose = require("mongoose");
const Todos = require("./src/models/todo");

//READ FILE
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`)); //converted to javascript object
const DB = process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Failed to connect to database"));

//UPLOAD TO DATABASE
const upload = async () => {
  console.log("uploading...");
  try {
    await Todos.create(data);
    console.log("uploaded");
  } catch (error) {
    console.log("upload failed", error);
  }
};

const remove = async () => {
  try {
    console.log("deleting...");
    await Todos.deleteMany({});
    console.log("deleted");
  } catch (error) {
    console.log("delete failed", error);
  }
};

if (process.argv[2] == "--delete") remove();
if (process.argv[2] == "--upload") upload();
