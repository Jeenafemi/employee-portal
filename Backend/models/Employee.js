
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      default: null
    },

    // 🔹 BASIC DETAILS
    employeeId: {
      type: String, 
      unique: true
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    dob: String,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },

    // JOB DETAILS
    jobTitle: String,

    employeeType: {
      type: String,
      enum: ["Full-time", "Part-time", "Intern"]
    },

    joiningDate: String,

    workLocation: {
      type: String,
      enum: ["Office", "Remote"]
    },

    experience: Number, 

    skills: [String], 

    linkedin: String,

    // SALARY
    salary: Number,

    paymentType: {
      type: String,
      enum: ["Monthly", "Hourly"]
    },

    // ADDRESS
    currentAddress: String,
    permanentAddress: String,
    city: String,
    state: String,
    pincode: String,

  
    // STATUS
    status: {
      type: Number,
      enum: [0, 1],
      default: 1
    }

  },
  { timestamps: true }
);


employeeSchema.pre("save", function (next) {
  if (!this.employeeId) {
    this.employeeId =
      "EMP" +
      Date.now() +
      Math.floor(Math.random() * 1000); 
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema, "employees");