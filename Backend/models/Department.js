const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema, "departments");
 module.exports = Department; 