<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const program = ref([]);

onMounted(() => {
  try {
    const savedProgram = localStorage.getItem("workoutProgram");
    if (savedProgram) {
      program.value = JSON.parse(savedProgram);
      console.log("Programma caricato:", program.value);
    } else {
      console.log("Nessun programma salvato trovato");
      alert(
        "Nessun programma salvato. Verrai reindirizzato alla pagina di creazione del programma."
      );
      router.push({ name: "CreateWorkoutProgram" });
    }
  } catch (error) {
    console.error("Errore durante il caricamento del programma:", error);
    alert(
      "Si è verificato un errore durante il caricamento del programma. Verrai reindirizzato alla pagina di creazione del programma."
    );
    router.push({ name: "CreateWorkoutProgram" });
  }
});

const toggleWorkoutCompletion = (dayIndex, workoutId) => {
  const workout = program.value[dayIndex].find((w) => w.id === workoutId);
  if (workout) {
    workout.completed = !workout.completed;
  }
};

const totalWorkouts = computed(() => {
  return program.value.reduce((total, day) => total + day.length, 0);
});

const completedWorkouts = computed(() => {
  return program.value.reduce((total, day) => {
    return total + day.filter((workout) => workout.completed).length;
  }, 0);
});

const progressPercentage = computed(() => {
  return Math.round((completedWorkouts.value / totalWorkouts.value) * 100);
});

const resetWeek = () => {
  program.value = program.value.map((day) =>
    day.map((workout) => ({ ...workout, completed: false }))
  );
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Il tuo Programma di Allenamento</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">Programma Settimanale</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="(day, index) in program" :key="index" class="border rounded-lg p-4">
          <h3 class="font-bold mb-2">Giorno {{ index + 1 }}</h3>
          <ul class="space-y-2">
            <li
              v-for="workout in day"
              :key="workout.id"
              class="flex items-center justify-between"
            >
              <span class="text-gray-700"
                >{{ workout.name }} ({{ workout.duration }} min)</span
              >
              <button
                @click="toggleWorkoutCompletion(index, workout.id)"
                :class="[
                  'px-2 py-1 rounded text-sm font-medium',
                  workout.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                {{ workout.completed ? "Completato" : "Completa" }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">I tuoi Progressi</h2>
      <div class="flex items-center justify-between mb-4">
        <span class="text-gray-700">Allenamenti completati questa settimana:</span>
        <span class="font-bold text-2xl">
          {{ completedWorkouts }} / {{ totalWorkouts }}
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <p class="mt-2 text-center text-gray-600">{{ progressPercentage }}% completato</p>
    </div>

    <div class="mt-8 text-center">
      <button
        @click="resetWeek"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Inizia una nuova settimana
      </button>
    </div>
  </div>
</template>
