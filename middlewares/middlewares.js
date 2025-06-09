const express = require("express");
const todosRouter = require("../routes/routes");
const { errorHandler, undefinedError } = require("../controllers/controller");
const app = express();

app.use(express.static(`./view`));
app.use(express.json());
app.use("/v1/api/todos", todosRouter);
app.use(undefinedError);
app.use(errorHandler);

module.exports = app;
