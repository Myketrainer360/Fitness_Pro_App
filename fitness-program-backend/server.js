require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Verifica che questo sia l'URL corretto del tuo frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Aggiungi "x-auth-token"
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware di logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Verifica la presenza di JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error(
    "ATTENZIONE: JWT_SECRET non è impostato. Imposta questa variabile d'ambiente per la sicurezza del token."
  );
  process.exit(1);
}

// Database connection
connectDB();

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");
const newsletterRoutes = require("./routes/newsletter");
const programsRoutes = require("./routes/programs");
const goalsRoutes = require("./routes/goals");
const fitnessLevelsRoutes = require("./routes/fitnessLevels");
const workoutTypesRoutes = require("./routes/workoutTypes");

// Routes
app.use("/api/goals", goalsRoutes);
app.use("/api/fitness-levels", fitnessLevelsRoutes);
app.use("/api/workout-types", workoutTypesRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/programs", programsRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500).send("Something broke!");
  }
});

// Aggiungi questo per il debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // for testing purposes
