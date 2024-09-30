// models/Workout.js
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  intensity: { type: String, enum: ["bassa", "media", "alta"], required: true },
  equipmentNeeded: [String],
  caloriesBurned: { type: Number, required: true },
  duration: { type: Number, required: true }, // durata in minuti
});

module.exports = mongoose.model("Workout", workoutSchema);
