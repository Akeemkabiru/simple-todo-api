require("dotenv").config({ path: `./src/config/.env` });
const fs = require("fs");
const Todos = require("./src/models/todo");
const connectDB = require("./src/config/database");
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

connectDB();

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
