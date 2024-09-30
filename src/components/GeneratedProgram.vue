<script setup>
import { useRouter } from "vue-router";

// All'interno del setup
const router = useRouter();

const props = defineProps({
  program: { type: Array, required: true },
  goal: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
  frequency: { type: Number, required: true },
  preferredWorkouts: { type: Array, required: true },
  duration: { type: String, required: true },
});

const saveProgram = () => {
  try {
    const programToSave = JSON.stringify(props.program);
    localStorage.setItem("workoutProgram", programToSave);
    console.log("Programma salvato:", programToSave);
    emit("saveProgram"); // Emettiamo l'evento invece di navigare direttamente
  } catch (error) {
    console.error("Errore durante il salvataggio del programma:", error);
    alert(
      "Si è verificato un errore durante il salvataggio del programma. Riprova."
    );
  }
};

const emit = defineEmits(["saveProgram"]);
</script>

<template>
  <div v-if="program && program.length">
    <h2 class="text-2xl font-bold mb-4">Il tuo Programma di Allenamento</h2>
    <div v-for="(day, index) in program" :key="index" class="mb-4">
      <h3 class="text-xl font-semibold">Giorno {{ index + 1 }}</h3>
      <ul>
        <li v-for="workout in day" :key="workout.id" class="ml-4">
          <strong>{{ workout.name }}</strong>
          <span v-if="workout.duration"> - {{ workout.duration }} minuti</span>
          <span
            v-if="workout.equipmentNeeded && workout.equipmentNeeded.length"
          >
            (Attrezzatura: {{ workout.equipmentNeeded.join(", ") }})
          </span>
        </li>
      </ul>
    </div>
    <button
      @click="saveProgram"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Salva Programma
    </button>
  </div>
  <div v-else>
    Nessun programma generato. Genera un programma per visualizzarlo qui.
  </div>
</template>
