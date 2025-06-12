const express = require("express");
const todosRouter = require("../routes/routes");
const {
  programErrorHandler,
  operationalError,
} = require("../controllers/controller");
const app = express();

app.use(express.json());
app.use("/v1/api/", todosRouter);
app.use(operationalError);
app.use(programErrorHandler);

module.exports = app;
