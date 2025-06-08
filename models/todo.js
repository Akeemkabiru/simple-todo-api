const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: String,
  due_date: {
    type: String,
    required: [true, "Due date is required"],
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
