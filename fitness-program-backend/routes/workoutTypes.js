// routes/workoutTypes.js
const express = require("express");
const router = express.Router();

const workoutTypes = [
  { value: "cardio", label: "Cardio" },
  { value: "forza", label: "Allenamento di forza" },
  { value: "flessibilita", label: "Flessibilità e stretching" },
  { value: "hiit", label: "HIIT (High Intensity Interval Training)" },
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
];

router.get("/", (req, res) => {
  try {
    res.json(workoutTypes);
  } catch (error) {
    console.error("Errore nel recupero dei tipi di allenamento:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;
