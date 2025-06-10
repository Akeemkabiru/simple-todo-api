const express = require("express");
const {
  getAllTodos,
  createTodo,
  getATodo,
  deleteTodo,
  markTodoStatus,
} = require("../controllers/controller");

const todosRouter = express.Router();
todosRouter.route("/").get(getAllTodos).post(createTodo);
todosRouter
  .route("/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(markTodoStatus);

module.exports = todosRouter;
