const express = require("express");
const {
  getAllTodos,
  createTodo,
  getATodo,
  deleteTodo,
  markTodoStatus,
  stats,
} = require("../controllers/controller");

const todosRouter = express.Router();

todosRouter.get("/stats", stats);
todosRouter.route("/").get(getAllTodos).post(createTodo);
todosRouter
  .route("/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(markTodoStatus);

module.exports = todosRouter;
