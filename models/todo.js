const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task is required"],
  },
  description: {
    type: String,
    required: false,
  },
  status: String,
  due_date: {
    type: String,
    required: [true, "Due date is required"],
  },
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
