const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter"); // Assicurati di aver creato questo modello

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res
      .status(201)
      .json({ message: "Iscrizione alla newsletter effettuata con successo" });
  } catch (error) {
    console.error("Errore durante l'iscrizione alla newsletter:", error);
    res
      .status(500)
      .json({ message: "Errore durante l'iscrizione alla newsletter" });
  }
});

module.exports = router;
