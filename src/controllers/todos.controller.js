const Todo = require("../models/todo");
const { response } = require("../utility");

//GET ALL Todo
exports.getAllTodo = async (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skips = (page - 1) * limit;

  try {
    const totalNums = await Todo.countDocuments();
    if (totalNums < skips) {
      response(res, "No more data left", 400);
    }
    const query = Todo.find().skip(skips).limit(limit).select("-__v");
    const data = await query;
    response(res, "Todo fetched successfully", 200, data, data.length);
  } catch (error) {
    next(error);
  }
};

//GET SINGLE TODO
exports.getATodo = async (req, res, next) => {
  try {
    const data = await Todo.findOne({
      _id: req.params.id,
      userId: req.user?._id,
    });
    if (!data)
      return response(res, `Todo of ID: ${req.params.id} does not exist`, 400);
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
    console.log(req.user._id);
    await Todo.create({ ...todo, userId: req.user?._id });
    response(res, "Todo created successfully", 201);
  } catch (error) {
    next(error);
  }
};

//DELETE A TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });
    if (!deleted)
      return response(res, `Todo of ID: ${req.params.id} does not exist`, 400);
    response(res, "Todo deleted successfully", 204);
  } catch (error) {
    next(error);
  }
};

//MARK TODO STATUS: COMPLETED, PROGRESS OR INCOMPLETED
exports.updateTodoStatus = async (req, res, next) => {
  if (!req.body.status || !req.body.status.length)
    return response(res, "Status is required", 400);
  try {
    const doc = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { status: req.body.status },
      {
        runValidators: true,
      }
    );
    if (!doc)
      return response(res, `Todo of ID: ${req.params.id} does not exist`, 400);

    response(res, `Todo status updated to  ${req.body.status}`, 200);
  } catch (error) {
    next(error);
  }
};

//STATS
exports.stats = async (req, res, next) => {
  try {
    const data = await Todo.aggregate([
      {
        $match: { userId: req.user?.id },
      },
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
