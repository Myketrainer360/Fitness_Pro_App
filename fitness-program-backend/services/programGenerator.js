// services/programGenerator.js
const Workout = require("../models/Workout");

const generateProgram = async (formData) => {
  const { goal, fitnessLevel, frequency, preferredWorkouts, duration } =
    formData;
  // Converti frequency e duration in numeri se necessario
  const numFrequency = Number(frequency);
  const numDuration = Number(duration);

  if (isNaN(numFrequency) || isNaN(numDuration)) {
    throw new Error("Frequency e duration devono essere numeri validi");
  }

  const program = [];
  const workoutIntensity = getWorkoutIntensity(fitnessLevel);
  const workoutTypes = await balanceWorkoutTypes(goal, preferredWorkouts);

  for (let i = 0; i < numFrequency; i++) {
    const dayWorkouts = [];
    let remainingTime = numDuration;

    while (remainingTime > 0) {
      const workoutType =
        workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
      try {
        const workout = await selectWorkout(workoutType, workoutIntensity);
        const workoutDuration = Math.min(
          remainingTime,
          Math.floor(Math.random() * (30 - 15 + 1)) + 15
        );

        dayWorkouts.push({
          id: workout._id,
          name: workout.name,
          type: workoutType,
          duration: workoutDuration,
          description: workout.description,
          equipmentNeeded: workout.equipmentNeeded,
          caloriesBurned: Math.round(
            workout.caloriesBurned * (workoutDuration / 30)
          ),
        });

        remainingTime -= workoutDuration;
      } catch (error) {
        console.error(`Errore nella selezione del workout: ${error.message}`);
        // Puoi decidere se continuare con il prossimo tipo di workout o interrompere la generazione
      }
    }

    program.push(dayWorkouts);
  }

  return program;
};

const getWorkoutIntensity = (fitnessLevel) => {
  switch (fitnessLevel) {
    case "principiante":
      return "bassa";
    case "intermedio":
      return "media";
    case "avanzato":
      return "alta";
    default:
      return "media";
  }
};

const balanceWorkoutTypes = async (goal, preferredWorkouts) => {
  let types = [...preferredWorkouts];

  // Aggiungi tipi di allenamento in base all'obiettivo
  switch (goal) {
    case "perdita-peso":
      types = types.concat(["cardio", "hiit", "flessibilita"]);
      break;
    case "aumento-massa":
      types = types.concat(["forza", "flessibilita", "hiit"]);
      break;
    case "resistenza":
      types = types.concat(["cardio", "hiit", "pilates"]);
      break;
    case "flessibilita":
      types = types.concat(["yoga", "pilates", "flessibilita"]);
      break;
  }

  // Assicurati che ci sia varietà
  if (types.length < 3) {
    const allTypes = await Workout.distinct("type");
    types = types.concat(allTypes.filter((t) => !types.includes(t)));
  }

  return types;
};

const selectWorkout = async (type, intensity) => {
  const workouts = await Workout.find({ type, intensity });
  if (workouts.length === 0) {
    // Se non trova workout con l'intensità specificata, prova con un'altra intensità
    const allWorkouts = await Workout.find({ type });
    if (allWorkouts.length === 0) {
      throw new Error(`Nessun workout trovato per il tipo: ${type}`);
    }
    return allWorkouts[Math.floor(Math.random() * allWorkouts.length)];
  }
  return workouts[Math.floor(Math.random() * workouts.length)];
};

module.exports = { generateProgram };
