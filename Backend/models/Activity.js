const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  type: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);