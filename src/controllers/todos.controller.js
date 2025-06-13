const Todo = require("../models/todo");
const { response } = require("../utility");

//GET ALL Todo
exports.getAllTodo = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedQueries = ["page", "limit", "sort", "field"];
  excludedQueries.forEach((el) => delete queryObj[el]);
  //PAGINATION
  const page = req.query.page;
  const limit = req.query.limit;
  const skips = (page - 1) * limit;

  const totalNums = await Todo.countDocuments();
  if (totalNums < skips) {
    response(res, "No more data left", 400);
  }

  //LIMIT FIELD
  const field = req.query.field;

  //SORT
  const sort = req.query.sort;

  try {
    const query = Todo.find(queryObj)
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
    const data = await Todo.findById(req.params.id);
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

    await Todo.create(todo);
    response(res, "Todo created successfully", 201);
  } catch (error) {
    next(error);
  }
};

//DELETE A TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    response(res, "Todo fetched successfully", 204);
  } catch (error) {
    next(error);
  }
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.markTodoStatus = async (req, res, next) => {
  if (!req.body.status) return response(res, "Status not defined", 400);
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    response(res, `Todo status marked as ${req.body.status}`, 200);
  } catch (error) {
    next(error);
  }
};

//STATS
exports.stats = async (req, res, next) => {
  try {
    const data = await Todo.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);
    response(res, "Todo stats fetched successfully", 200, data);
  } catch (error) {
    next(error);
  }
};
