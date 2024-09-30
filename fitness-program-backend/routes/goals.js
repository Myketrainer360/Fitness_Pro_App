// routes/goals.js
const express = require("express");
const router = express.Router();

const goals = [
  { value: "perdita-peso", label: "Perdita di peso" },
  { value: "aumento-massa", label: "Aumento della massa muscolare" },
  { value: "resistenza", label: "Miglioramento della resistenza" },
  { value: "flessibilita", label: "Aumento della flessibilità" },
];

router.get("/", (req, res) => {
  try {
    res.json(goals);
  } catch (error) {
    console.error("Errore nel recupero degli obiettivi:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

module.exports = router;
