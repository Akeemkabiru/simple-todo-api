const express = require("express");
const {
  stats,
  createTodo,
  getAllTodo,
  getATodo,
  deleteTodo,
  updateTodoStatus,
} = require("../controllers/todos.controller");
const { restrict, adminStats } = require("../controllers/user.controller");
const appRouter = express.Router();

appRouter.get("/stats", restrict("admin"), adminStats);
appRouter.route("/todos/stats", stats);
appRouter.route("/todos").get(getAllTodo).post(createTodo);
appRouter
  .route("/todos/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(updateTodoStatus);

module.exports = appRouter;
