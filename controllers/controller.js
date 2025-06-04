//READ TODO FILE
const fs = require("fs");
const todosJson = JSON.parse(fs.readFileSync("./todo.json"));

//GET ALL TODOS
exports.getAllTodos = (req, res) => {
  res.status(200).json({
    message: "Todos fetched successfully",
    data: todosJson,
    result: todosJson.length,
  });
};

//GET SINGLE TODO
exports.getATodo = (req, res) => {
  const todo = todosJson.find((el) => el.id == req.params.id);
  res.status(200).json({ message: "Todo fetched successfully", data: todo });
};

exports.createTodo = (req, res) => {
  const newTodo = { ...req.body, id: todosJson[todosJson.length - 1]?.id + 1 };
  todosJson.push(newTodo);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(todosJson), () =>
    res.status(201).json({ message: "Todo created successfully" })
  );
};

//DELETE A TODO
exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  const todo = todosJson.find((el) => el.id == id);
  if (!todo) res.status(404).send(`No todo with ID of ${id}`);

  const newTodos = todosJson.filter((el) => el.id != id);
  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(newTodos), () => {
    res.status(204).send({ message: "successfully deleted" });
  });
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.markTodoStatus = (req, res) => {
  const id = req.params.id;
  if (!id) res.status(404).send("A valid id is required");
  const todo = todosJson.find((el) => el.id == id);
  Object.assign(todo, req.body);
  const updatedTodo = todosJson.map((el) => (el.id == id ? todo : el));

  fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(updatedTodo), () =>
    res.status(200).send({ message: `Todo marked as ${req.body.status}` })
  );
};
