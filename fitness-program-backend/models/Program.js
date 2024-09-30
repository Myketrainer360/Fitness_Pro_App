// models/Program.js
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  userId: String,
  program: Array,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Program", programSchema);
