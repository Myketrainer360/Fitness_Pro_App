<script setup>
import { ref, reactive } from "vue";
import ProgressSummary from "@/components/dashboard/ProgressSummary.vue";
import NextLesson from "@/components/dashboard/NextLesson.vue";
import ActiveChallenges from "@/components/dashboard/ActiveChallenges.vue";
import RecommendedLessons from "@/components/dashboard/RecommendedLessons.vue";
import ChallengeSystem from "../components/ChallengeSystem.vue";

// Stato dell'utente
const user = reactive({
  name: "Mario Rossi",
  completedLessons: 15,
  totalMinutesWorkedOut: 450,
  caloriesBurned: 3200,
  currentLesson: null,
  bookedLessons: [],
  lessonHistory: [], // Nuovo array per tenere traccia delle lezioni completate
});

// Prossima lezione programmata
const nextLesson = ref({
  id: 100,
  title: "Yoga Avanzato",
  date: new Date("2024-08-30T10:00:00"),
  duration: 60, // durata in minuti
});

// Sfide attive
const activeChallenges = ref([
  { id: 1, name: "Sfida 30 Giorni di Fitness", progress: 60 },
  { id: 2, name: "Maratona di Yoga", progress: 45 },
]);

// Lezioni consigliate
const recommendedLessons = ref([
  {
    id: 101,
    title: "Pilates per Principianti",
    description: "Perfetto per chi inizia con il Pilates",
    duration: 45,
  },
  {
    id: 102,
    title: "HIIT Cardio Blast",
    description: "Brucia calorie con questo allenamento intenso",
    duration: 30,
  },
  {
    id: 103,
    title: "Meditazione Guidata",
    description: "Riduci lo stress con questa sessione di meditazione",
    duration: 20,
  },
]);

// Funzione per formattare la data
const formatDate = (date) => {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

// Funzione per avviare una lezione
const startLesson = () => {
  if (user.currentLesson) {
    alert("Hai già una lezione in corso!");
    return;
  }

  user.currentLesson = {
    ...nextLesson.value,
    startTime: new Date(),
  };
  alert(`Lezione "${nextLesson.value.title}" avviata! Buon allenamento!`);

  // Aggiorniamo la prossima lezione (in un'app reale, questa verrebbe presa dal backend)
  nextLesson.value = user.bookedLessons.shift() || null;
};

// Funzione per terminare manualmente una lezione
const endLesson = () => {
  if (!user.currentLesson) {
    alert("Non hai lezioni in corso da terminare!");
    return;
  }

  const confirmation = confirm("Sei sicuro di voler terminare la lezione in corso?");
  if (confirmation) {
    completeLesson();
  }
};

// Funzione per completare una lezione
const completeLesson = () => {
  if (!user.currentLesson) return;

  const endTime = new Date();
  const durationInMinutes = Math.round((endTime - user.currentLesson.startTime) / 60000);

  user.completedLessons++;
  user.totalMinutesWorkedOut += durationInMinutes;
  user.caloriesBurned += Math.floor(durationInMinutes * 5); // Assumiamo 5 calorie bruciate al minuto

  // Salviamo la lezione completata nella cronologia
  user.lessonHistory.push({
    ...user.currentLesson,
    endTime,
    actualDuration: durationInMinutes,
  });

  alert(
    `Congratulazioni! Hai completato la lezione "${user.currentLesson.title}" in ${durationInMinutes} minuti!`
  );
  user.currentLesson = null;
};

// Funzione per prenotare una lezione
const bookLesson = (lessonId) => {
  const lesson = recommendedLessons.value.find((l) => l.id === lessonId);
  if (!lesson) {
    alert("Lezione non trovata!");
    return;
  }

  // Aggiungiamo la lezione alle lezioni prenotate
  user.bookedLessons.push({
    ...lesson,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Impostiamo la data a domani
  });

  // Rimuoviamo la lezione dalle lezioni consigliate
  recommendedLessons.value = recommendedLessons.value.filter((l) => l.id !== lessonId);

  // Se non c'è una prossima lezione programmata, impostiamo questa come prossima
  if (!nextLesson.value) {
    nextLesson.value = user.bookedLessons.shift();
  }

  alert(`Lezione "${lesson.title}" prenotata con successo!`);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
      Dashboard Utente
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ProgressSummary :user="user" class="text-gray-700" />
      <NextLesson
        :lesson="nextLesson"
        :formatDate="formatDate"
        @start-lesson="startLesson"
        @end-lesson="endLesson"
      />
      <ActiveChallenges :challenges="activeChallenges" />
    </div>

    <RecommendedLessons
      :lessons="recommendedLessons"
      @book-lesson="bookLesson"
      class="mt-8"
    />

    <!-- Sezione Cronologia Lezioni -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Cronologia Lezioni</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ul v-if="user.lessonHistory.length > 0" class="divide-y divide-gray-200">
          <li v-for="lesson in user.lessonHistory" :key="lesson.id" class="py-4">
            <h3 class="font-semibold">{{ lesson.title }}</h3>
            <p class="text-sm text-gray-600">Data: {{ formatDate(lesson.startTime) }}</p>
            <p class="text-sm text-gray-600">
              Durata effettiva: {{ lesson.actualDuration }} minuti
            </p>
          </li>
        </ul>
        <p v-else class="text-gray-500">Non hai ancora completato nessuna lezione.</p>
      </div>
    </div>

    <!-- Sistema di Sfide -->
    <ChallengeSystem class="mt-8 container mx-auto px-4" />
  </div>
</template>
