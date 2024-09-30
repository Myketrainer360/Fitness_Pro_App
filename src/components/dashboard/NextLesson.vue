<script setup>
defineProps({
  nextLesson: Object,
  currentLesson: Object,
  formatDate: Function,
});

const emit = defineEmits(["start-lesson", "end-lesson"]);

const startLesson = () => emit("start-lesson");
const endLesson = () => emit("end-lesson");
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">Lezione Corrente / Prossima Lezione</h2>
    <div v-if="currentLesson">
      <p class="font-bold mb-2">{{ currentLesson.title }} (In corso)</p>
      <p class="text-gray-600 mb-2">
        Iniziata il: {{ formatDate(currentLesson.startTime) }}
      </p>
      <button
        @click="endLesson"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Termina Lezione
      </button>
    </div>
    <div v-else-if="nextLesson">
      <p class="font-bold mb-2">{{ nextLesson.title }}</p>
      <p class="text-gray-600 mb-2">{{ formatDate(nextLesson.date) }}</p>
      <p class="text-gray-600 mb-4">Durata: {{ nextLesson.duration }} minuti</p>
      <button
        @click="startLesson"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Inizia Lezione
      </button>
    </div>
    <p v-else class="text-gray-600">
      Nessuna lezione programmata. Perché non ne prenoti una?
    </p>
  </div>
</template>
