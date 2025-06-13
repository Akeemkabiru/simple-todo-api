const connectDB = require("./config/database");
const express = require("express");
const { operationalError, programError } = require("./utility");
const appRouter = require("./routes/routes");
const app = express();

connectDB();
app.use(express.json());
app.use("/v1/api/", appRouter);
app.use(operationalError);
app.use(programError);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
