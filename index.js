const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

//ROOT
app.get("/v1/", (req, res) => {
  res.status(200).send("Hello world");
});

//GET ALL TODOS
const todos = fs.readFileSync(`${__dirname}/todo.json`);
const todosJson = JSON.parse(todos);
app.get("/v1/todos", (req, res) => {
  res.status(200).json({
    message: "Todos fetched successfully",
    data: todosJson,
    result: todosJson.length,
  });
});

//GET SINGLE TODO
app.get("/v1/todos/:id", (req, res) => {
  const todo = todosJson.find((el) => el.id == req.params.id);
  res.status(200).json({ message: "Todo fetched successfully", data: todo });
});

//ADD A TODO
app.post("/v1/todos", (req, res) => {
  const newTodo = { ...req.body, id: todosJson[todosJson.length - 1]?.id + 1 };
  todosJson.push(newTodo);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(todosJson), () =>
    res.status(201).json({ message: "Todo created successfully" })
  );
});

//DELETE TODO
app.delete("/v1/todos/:id", (req, res) => {
  const newTodos = todosJson.filter((el) => el.id != req.params.id);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(newTodos), () => {
    res.status(204).send({ message: "successfully deleted" });
  });
});

//MARK TODO AS COMPLETED, PROGRESS OR INCOMPLETED
app.patch("/v1/todos/:id", (req, res) => {
  const todo = todosJson.find((el) => el.id == req.params.id);
  Object.assign(todo, req.body);
  const updatedTodo = todosJson.map((el) =>
    el.id == req.params.id ? todo : el
  );

  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(updatedTodo), () =>
    res.status(200).send({ message: `Todo marked as ${req.body.status}` })
  );
});

app.listen(9000, () => console.log("Server running"));
