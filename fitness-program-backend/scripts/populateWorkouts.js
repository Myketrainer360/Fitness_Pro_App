// scripts/populateWorkouts.js
const mongoose = require("mongoose");
const Workout = require("../models/Workout");

mongoose.connect("mongodb://localhost/fitness_program");

const workouts = [
  {
    name: "Corsa leggera",
    type: "cardio",
    description: "Corsa a ritmo costante e leggero",
    intensity: "bassa",
    equipmentNeeded: ["Scarpe da corsa"],
    caloriesBurned: 300,
    duration: 30,
  },
  {
    name: "Interval Running",
    type: "cardio",
    description: "Alternanza di scatti veloci e recupero",
    intensity: "alta",
    equipmentNeeded: ["Scarpe da corsa"],
    caloriesBurned: 400,
    duration: 30,
  },
  {
    name: "Sollevamento pesi",
    type: "forza",
    description: "Serie di esercizi con pesi per tutto il corpo",
    intensity: "media",
    equipmentNeeded: ["Manubri", "Bilanciere"],
    caloriesBurned: 200,
    duration: 45,
  },
  {
    name: "Yoga Flow",
    type: "flessibilita",
    description: "Sequenza fluida di pose yoga",
    intensity: "bassa",
    equipmentNeeded: ["Tappetino yoga"],
    caloriesBurned: 150,
    duration: 60,
  },
  {
    name: "HIIT Cardio",
    type: "hiit",
    description: "Allenamento ad alta intensità intervallato",
    intensity: "alta",
    equipmentNeeded: [],
    caloriesBurned: 400,
    duration: 20,
  },
  {
    name: "Pilates",
    type: "pilates",
    description: "Esercizi di controllo e stabilità del core",
    intensity: "media",
    equipmentNeeded: ["Tappetino"],
    caloriesBurned: 200,
    duration: 45,
  },
];

const populateDatabase = async () => {
  try {
    await Workout.deleteMany({}); // Pulisce il database prima di inserire nuovi dati
    const result = await Workout.insertMany(workouts);
    console.log(`${result.length} allenamenti inseriti nel database`);
  } catch (error) {
    console.error("Errore durante il popolamento del database:", error);
  } finally {
    mongoose.disconnect();
  }
};

populateDatabase();
