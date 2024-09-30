// routes/fitnessLevels.js
const express = require("express");
const router = express.Router();

const fitnessLevels = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzato", label: "Avanzato" },
];

router.get("/", (req, res) => {
  try {
    res.json(fitnessLevels);
  } catch (error) {
    console.error("Errore nel recupero dei livelli di fitness:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;
