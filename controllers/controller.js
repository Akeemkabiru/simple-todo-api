//READ TODO FILE
const Todos = require("../models/todo");
const { response } = require("../utility/response");

//GET ALL TODOS
exports.getAllTodos = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedQueries = ["page", "limit", "sort", "field"];
  excludedQueries.forEach((el) => delete queryObj[el]);

  try {
    const query = Todos.find(queryObj);
    const data = await query;
    response(res, "Todo fetched successfully", 200, data, data.length);
  } catch (error) {
    next(error);
  }
};

//GET SINGLE TODO
exports.getATodo = async (req, res, next) => {
  try {
    const data = await Todos.findById(req.params.id);
    response(res, "Todo fetched successfully", 200, data);
  } catch (error) {
    next(error);
  }
};

//CREATE A TODO
exports.createTodo = async (req, res, next) => {
  try {
    await Todos.create(req.body);
    response(res, "Todo fetched successfully", 201);
  } catch (error) {
    next(error);
  }
};

//DELETE A TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    await Todos.findByIdAndDelete(req.params.id);
    response(res, "Todo fetched successfully", 204);
  } catch (error) {
    next(error);
  }
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.markTodoStatus = async (req, res, next) => {
  try {
    await Todos.findByIdAndUpdate(req.params.id, req.body, {});
    response(res, `Todo status marked as ${req.body.status}`, 200);
  } catch (error) {
    next(error);
  }
};

//ERROR HANDLERs
//global error
exports.errorHandler = (err, req, res, next) => {
  response(res, err.message, 400);
};

//undefined error
exports.undefinedError = (req, res, next) => {
  next(new AppError("route not found", 404));
};
