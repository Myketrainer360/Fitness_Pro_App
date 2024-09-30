const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User"); // Assicurati di aver creato questo modello

router.get("/me", auth, async (req, res) => {
  console.log("Richiesta profilo utente ricevuta");
  console.log("ID utente dalla richiesta:", req.user.id);
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("Utente trovato:", user);
    res.json(user);
  } catch (err) {
    console.error("Errore nel recupero del profilo utente:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("Dati ricevuti per la registrazione:", req.body);
    const { nome, email } = req.body;

    if (!nome || !email) {
      console.log("Dati mancanti:", { nome, email });
      return res.status(400).json({ message: "Nome e email sono richiesti" });
    }
    const newUser = new User({ nome, email });
    console.log("Nuovo utente creato:", newUser);
    await newUser.save();
    console.log("Utente salvato con successo");
    res
      .status(201)
      .json({ message: "Utente registrato con successo", user: newUser });
  } catch (error) {
    console.error("Errore durante la registrazione dell'utente:", error);
    res
      .status(500)
      .json({ message: "Errore durante la registrazione dell'utente" });
  }
});

module.exports = router;
