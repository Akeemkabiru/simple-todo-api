//READ TODO FILE
const Todos = require("../models/todo");
const { response } = require("../utility/response");

//GET ALL TODOS

//FILTER
exports.getAllTodos = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedQueries = ["page", "limit", "sort", "field"];
  excludedQueries.forEach((el) => delete queryObj[el]);
  //PAGINATION
  const page = req.query.page;
  const limit = req.query.limit;
  const skips = (page - 1) * limit;

  const totalNums = await Todos.countDocuments();
  if (totalNums < skips) {
    response(res, "No more data left", 400);
  }

  //LIMIT FIELD
  const field = req.query.field;

  //SORT
  const sort = req.query.sort;

  try {
    const query = Todos.find(queryObj)
      .sort(sort)
      .skip(skips)
      .limit(limit)
      .select(field);
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
  const { start_date, start_time, due_date, due_time, ...rest } = req.body;
  if (!(start_date || start_time)) {
    return response(res, "Start and due date is required", 400);
  }
  try {
    const start = new Date(`${start_date}T${start_time || "00:00"}`);
    const due = new Date(`${due_date}T${due_time || "00:00"}`);
    const todo = { start, due, ...rest };

    await Todos.create(todo);
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
