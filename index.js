const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
const todosRouter = express.Router();
app.use("/api/v1/todos", todosRouter);

//READ TODO FILE
const todos = fs.readFileSync(`${__dirname}/todo.json`);
const todosJson = JSON.parse(todos);
const PORT = 9000;

//ROOT
todosRouter.get("/v1/", (req, res) => {
  res.status(200).send("Hello world");
});

//GET ALL TODOS
function getAllTodos(req, res) {
  res.status(200).json({
    message: "Todos fetched successfully",
    data: todosJson,
    result: todosJson.length,
  });
}

//GET SINGLE TODO
function getATodo(req, res) {
  const todo = todosJson.find((el) => el.id == req.params.id);
  res.status(200).json({ message: "Todo fetched successfully", data: todo });
}

function createTodo(req, res) {
  const newTodo = { ...req.body, id: todosJson[todosJson.length - 1]?.id + 1 };
  todosJson.push(newTodo);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(todosJson), () =>
    res.status(201).json({ message: "Todo created successfully" })
  );
}

//DELETE A TODO
function deleteTodo(req, res) {
  const id = req.params.id;
  const todo = todosJson.find((el) => el.id == id);
  if (!todo) res.status(404).send(`No todo with ID of ${id}`);

  const newTodos = todosJson.filter((el) => el.id != id);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(newTodos), () => {
    res.status(204).send({ message: "successfully deleted" });
  });
}

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
function markTodoStatus(req, res) {
  const id = req.params.id;
  if (!id) res.status(404).send("A valid id is required");
  const todo = todosJson.find((el) => el.id == id);
  Object.assign(todo, req.body);
  const updatedTodo = todosJson.map((el) => (el.id == id ? todo : el));

  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(updatedTodo), () =>
    res.status(200).send({ message: `Todo marked as ${req.body.status}` })
  );
}

todosRouter.route("/").get(getAllTodos).post(createTodo);
todosRouter
  .route("/:id")
  .get(getATodo)
  .delete(deleteTodo)
  .patch(markTodoStatus);

//LISTENING
app.listen(PORT, () => console.log("Server running"));
