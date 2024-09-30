// routes/programs.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Program = require("../models/Program");
const { generateProgram } = require("../services/programGenerator");

router.post("/generate", auth, async (req, res) => {
  console.log("Dati ricevuti per la generazione:", req.body);
  try {
    const { goal, fitnessLevel, frequency, preferredWorkouts, duration } =
      req.body;

    // Validazione dei dati
    if (!goal || typeof goal !== "string")
      throw new Error("Goal mancante o non valido");
    if (!fitnessLevel || typeof fitnessLevel !== "string")
      throw new Error("Fitness level mancante o non valido");
    if (!frequency || typeof frequency !== "number")
      throw new Error("Frequency mancante o non valida");
    if (!Array.isArray(preferredWorkouts) || preferredWorkouts.length === 0)
      throw new Error("Preferred workouts mancanti o non validi");
    if (
      !duration ||
      (typeof duration !== "number" && typeof duration !== "string")
    )
      throw new Error("Duration mancante o non valida");

    console.log("Inizio generazione programma");
    const program = await generateProgram(req.body);
    console.log("Programma generato con successo:", program);
    res.json(program);
  } catch (err) {
    console.error("Errore dettagliato nella generazione del programma:", err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/user", auth, async (req, res) => {
  // Logica per ottenere i programmi dell'utente
});

router.post("/save", async (req, res) => {
  console.log("Richiesta di salvataggio ricevuta:", req.body);
  // Implementa qui la logica di salvataggio

  try {
    const { program } = req.body;
    // Qui dovresti implementare la logica per salvare il programma nel database
    // Per ora, simuliamo un salvataggio di successo
    console.log("Programma ricevuto per il salvataggio:", program);

    // Simula un ritardo di 1 secondo (come se stessimo salvando nel database)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({ message: "Programma salvato con successo" });
  } catch (error) {
    console.error("Errore nel salvataggio del programma:", error);
    // Assicurati di non inviare una risposta se c'è già stato un errore
    if (!res.headersSent)
      res.status(500).json({ error: "Errore nel salvataggio del programma" });
  }
});

module.exports = router;
