const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "overdue"],
      default: "pending",
    },
    due: {
      type: Date,
      required: [true, "Time and Date are required"],
    },
    start: {
      type: Date,
      required: [true, "Time and Date are required"],
    },

    category: {
      type: String,
      enum: [
        "Academics",
        "Work",
        "Non",
        "Health",
        "Home",
        "Relationship",
        "Finances",
        "Learning",
        "Personal",
        "Errands",
        "Fun",
        "Spirituality",
      ],
      default: "Non",
      required: false,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
