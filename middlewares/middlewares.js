const morgan = require("morgan");
const express = require("express");
const todosRouter = require("../routes/routes");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/todos", todosRouter);

module.exports = app;
