const express = require("express");
const {
  stats,
  createTodo,
  getAllTodo,
  getATodo,
  deleteTodo,
  updateTodoStatus,
} = require("../controllers/todos.controller");
const {
  adminStats,
  signup,
  login,
  protected,
  restrict,
} = require("../controllers/user.controller");
const appRouter = express.Router();

//Auth
appRouter.post("/signup", signup);
appRouter.post("/login", login);

//ADMIN STATS
appRouter.get("/stats", protected, restrict("admin"), adminStats);

//TODO STATS
appRouter.get("/todos/stats", protected, stats);

//TODO CRUD
appRouter
  .route("/todos")
  .get(protected, getAllTodo)
  .post(protected, createTodo);
appRouter
  .route("/todos/:id")
  .get(protected, getATodo)
  .delete(protected, deleteTodo)
  .patch(protected, updateTodoStatus);

module.exports = appRouter;
