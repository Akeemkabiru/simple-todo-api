const express = require("express");
const {
  getAllTodos,
  createTodo,
  getATodo,
  deleteTodo,
  markTodoStatus,
  stats,
  signup,
} = require("../controllers/controller");

const todosRouter = express.Router();

todosRouter.post("/signup", signup);
todosRouter.get("/stats", stats);
todosRouter.route("/todos").get(getAllTodos).post(createTodo);
todosRouter
  .route("/todos/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(markTodoStatus);

module.exports = todosRouter;
