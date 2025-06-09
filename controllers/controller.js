//READ TODO FILE
const Todos = require("../models/todo");

//GET ALL TODOS
exports.getAllTodos = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedQueries = ["page", "limit", "sort", "field"];
  excludedQueries.forEach((el) => delete queryObj[el]);
  try {
    const query = Todos.find(queryObj);
    const data = await query;
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
    const data = await Todos.findById(req.params.id);
    res.status(200).json({
      message: "Todo fetched successfully",
      data,
    });
  } catch (error) {
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
    await Todos.findByIdAndDelete(req.params.id);
    res.status(204).send("");
  } catch (error) {
    next(error);
  }
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.markTodoStatus = async (req, res, next) => {
  try {
    await Todos.findByIdAndUpdate(req.params.id, req.body, {});
    res.status(200).json({
      message: `Todo status marked as ${req.body.status}`,
    });
  } catch (error) {
    next(error);
  }
};

//ERROR HANDLERs
//global error
exports.errorHandler = (err, req, res, next) => {
  return res.status(400).json({ status: "failed", message: err.message });
};

//undefined error
exports.undefinedError = (req, res, next) => {
  next(new AppError("route not found", 404));
};
