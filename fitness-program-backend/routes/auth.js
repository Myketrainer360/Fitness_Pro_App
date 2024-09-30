const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  console.log("Ricevuta richiesta di registrazione:", req.body);
  try {
    const { nome, email, password } = req.body;
    if (!nome || !email || !password) {
      return res.status(400).json({ message: "Tutti i campi sono richiesti" });
    }
    // Verifica se l'utente esiste già
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Utente già esistente" });
    }

    // Crea un nuovo utente
    user = new User({
      nome,
      email,
      password,
    });

    //Hash della password durante la registrazione
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    // Salva l'utente nel database
    await user.save();

    // Crea e invia il token JWT
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore del server");
  }
});

router.post("/login", async (req, res) => {
  console.log("Tentativo di login ricevuto:", req.body);
  try {
    const { email, password } = req.body;
    // Log per debugging
    console.log("Email ricevuta:", email);
    let user = await User.findOne({ email });
    console.log("Utente trovato:", user);
    if (!user) {
      return res.status(400).json({ message: "Credenziali non valide" });
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password corrisponde:", isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: "Credenziali non valide" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error("Errore nella generazione del token:", err);
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (bcryptError) {
      console.error(
        "Errore durante la comparazione della password: ",
        bcryptError
      );
      return res
        .status(500)
        .json({ message: "Errore durante la verifica della password" });
    }
  } catch (error) {
    console.error("Errore durante il login:", error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
});
module.exports = router;
