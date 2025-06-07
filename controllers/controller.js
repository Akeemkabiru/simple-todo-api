//READ TODO FILE
const Todos = require("../models/todo");

//GET ALL TODOS
exports.getAllTodos = async (req, res, next) => {
  try {
    const data = await Todos.find();
    res.status(200).json({
      message: "Todo fetched successfully",
      data,
      result: data?.length,
    });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE TODO
exports.getATodo = async (req, res, next) => {
  try {
    const data = await Todos.find({ _id: req.params.id });
    res.status(200).json({
      message: "Todo fetched successfully",
      data,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

//CREATE A TODO
exports.createTodo = async (req, res, next) => {
  try {
    await Todos.create(req.body);
    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    next(error);
  }
};

//DELETE A TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    await Todos.deleteOne({ _id: req.params.id });
    res.status(204).send("");
  } catch (error) {
    next(error);
  }
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.markTodoStatus = async (req, res, next) => {
  try {
    await Todos.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({
      message: `Todo status marked as ${req.body.status}`,
    });
  } catch (error) {
    next(error);
  }
};
