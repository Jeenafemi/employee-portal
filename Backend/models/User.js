const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    status: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Users = mongoose.model("Users", userSchema, "users");
module.exports = Users;
