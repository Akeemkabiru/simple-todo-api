const express = require("express");
const { signup } = require("../controllers/user.controller");
const {
  stats,
  createTodo,
  getAllTodo,
  getATodo,
  deleteTodo,
  markTodoStatus,
} = require("../controllers/todos.controller");
const appRouter = express.Router();

appRouter.post("/signup", signup);
appRouter.get("/todos/stats", stats);
appRouter.route("/todos").get(getAllTodo).post(createTodo);
appRouter
  .route("/todos/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(markTodoStatus);

module.exports = appRouter;
