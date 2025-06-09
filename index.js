require("dotenv").config({ path: "./config/.env" });
const app = require("./middlewares/middlewares");
const mongoose = require("mongoose");
const DB = process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to the database"))
  .catch(() => console.log("Could not connect to database"));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
