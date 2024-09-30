// routes/workouts.js
const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
