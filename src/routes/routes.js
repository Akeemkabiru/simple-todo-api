const express = require("express");
const { signup } = require("../controllers/user.controller");
const {
  stats,
  createTodo,
  getAllTodo,
  getATodo,
  deleteTodo,
  updateTodoStatus,
} = require("../controllers/todos.controller");
const appRouter = express.Router();

appRouter.post("/signup", signup);
appRouter.get("/todos/stats", stats);
appRouter.route("/todos").get(getAllTodo).post(createTodo);
appRouter
  .route("/todos/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(updateTodoStatus);

module.exports = appRouter;
