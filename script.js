//script to upload data to database difference from our express app

require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const Todos = require("./models/todo");
const DB = process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD);

async function connectDB() {
  try {
    await mongoose.connect(DB);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
}
connectDB();

//READING TO DOD FROM DATA FILE
const todo = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

const upload = async () => {
  console.log("uploading...");
  try {
    await Todos.create(todo);
    console.log("uploaded");
  } catch (error) {
    console.log(error.message);
  }
};

//REMOVE ALL DATA FROM DATABASE : DO NOT TRY THIS
const deleteTodo = async () => {
  console.log("deleting...");
  try {
    await Todos.deleteMany();
    console.log("deleted");
  } catch (error) {
    console.log("delete failed");
  }
};

process.argv[2] == "--delete" && deleteTodo();
process.argv[2] == "--upload" && upload();
