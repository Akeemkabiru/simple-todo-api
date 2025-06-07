require("dotenv").config({ path: "./config/.env" });
const app = require("./middlewares/middlewares");
const mongoose = require("mongoose");

const DB = process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD);
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
  } catch (error) {
    console.log("Could not connect to the database", error);
  }
};

connectDB();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
