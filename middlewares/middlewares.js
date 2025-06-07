const express = require("express");
const todosRouter = require("../routes/routes");
const app = express();
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

app.use(express.json());
// app.use(morgan("dev"));
app.use("/v1/api/todos", todosRouter);

module.exports = app;
