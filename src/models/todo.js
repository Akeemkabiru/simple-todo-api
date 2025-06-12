const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
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
    priority: Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  { timestamps: true }
);

//VIRTUAL PROPERTY AND NOT SAVED TO THE DATABASE
// todoSchema.virtual("taskLogs").get(function () {
//   return this.task;
// });

//DOOCUMENT MIDDLEWARES or HOOKS

//document right before saving it to database
// todoSchema.pre("save", function (next) {
//   console.log(this);
//   next();
// });

//after save
// todoSchema.post("save", function (doc) {
//   console.log(doc.task);
// });

//QUERY MIDDLEWARE
todoSchema.pre("/^find/", function (next) {
  this.find({ priority: { $gte: 4 } });
  next();
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
