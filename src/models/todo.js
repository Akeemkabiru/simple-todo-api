const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    status: {
      type: String,
      enum: {
        values: ["pending", "in progress", "completed", "overdue"],
        message: "Status can either be pending, completed or overdue",
      },
      default: "pending",
    },
    due: {
      type: String,
      required: [true, "Time and Date are required"],
    },
    start: {
      type: String,
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
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
