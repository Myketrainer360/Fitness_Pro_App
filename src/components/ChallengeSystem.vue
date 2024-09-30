<script setup>
import { ref, computed } from "vue";

const activeChallenges = ref([
  {
    id: 1,
    name: "Corsa 5K",
    category: "Cardio",
    description: "Corri 5 km in una settimana",
    progress: 60,
    reward: 100,
  },
  {
    id: 2,
    name: "Squat Challenge",
    category: "Forza",
    description: "Fai 100 squat al giorno per 7 giorni",
    progress: 30,
    reward: 150,
  },
]);

const userPoints = ref(450);
const userLevel = ref(3);

const pointsToNextLevel = computed(() => {
  return 1000 - (userPoints.value % 1000);
});

const levelProgress = computed(() => {
  return (userPoints.value % 1000) / 10;
});

const showNewChallengeModal = ref(false);

const availableChallenges = ref([
  {
    id: 3,
    name: "Meditazione Quotidiana",
    category: "Benessere",
    description: "Medita per 10 minuti al giorno per 10 giorni",
    reward: 200,
  },
  {
    id: 4,
    name: "Push-up Master",
    category: "Forza",
    description: "Fai 50 push-up al giorno per 5 giorni",
    reward: 180,
  },
  {
    id: 5,
    name: "Idratazione",
    category: "Salute",
    description: "Bevi 2 litri d'acqua al giorno per 7 giorni",
    reward: 120,
  },
]);

const startNewChallenge = () => {
  showNewChallengeModal.value = true;
};

const selectChallenge = (challenge) => {
  activeChallenges.value.push({ ...challenge, progress: 0 });
  availableChallenges.value = availableChallenges.value.filter(
    (c) => c.id !== challenge.id
  );
  showNewChallengeModal.value = false;
};

const updateChallengeProgress = (challengeId, progressIncrement) => {
  const challenge = activeChallenges.value.find((c) => c.id === challengeId);
  if (challenge) {
    challenge.progress = Math.min(100, challenge.progress + progressIncrement);
    if (challenge.progress === 100) {
      completeChallenge(challenge);
    }
  }
};

const completeChallenge = (challenge) => {
  userPoints.value += challenge.reward;
  userLevel.value = Math.floor(userPoints.value / 1000) + 1;
  activeChallenges.value = activeChallenges.value.filter(
    (c) => c.id !== challenge.id
  );
  alert(
    `Congratulazioni! Hai completato la sfida "${challenge.name}" e guadagnato ${challenge.reward} punti!`
  );
};

const abandonChallenge = (challengeId) => {
  const challengeIndex = activeChallenges.value.findIndex(
    (c) => c.id === challengeId
  );
  if (challengeIndex !== -1) {
    const challenge = activeChallenges.value[challengeIndex];
    availableChallenges.value.push({ ...challenge, progress: 0 });
    activeChallenges.value.splice(challengeIndex, 1);
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 class="text-2xl font-semibold mb-4">Sfide Attive</h2>
    <div v-if="activeChallenges.length > 0" class="space-y-4">
      <div
        v-for="challenge in activeChallenges"
        :key="challenge.id"
        class="border p-4 rounded-lg"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">{{ challenge.name }}</h3>
          <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">
            {{ challenge.category }}
          </span>
        </div>
        <p class="text-gray-600 mb-2">{{ challenge.description }}</p>
        <div class="flex justify-between items-center">
          <div class="w-2/3">
            <div class="bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                :style="{ width: `${challenge.progress}%` }"
              ></div>
            </div>
          </div>
          <span class="text-sm font-medium">{{ challenge.progress }}%</span>
        </div>
        <div class="mt-2 text-sm text-gray-500">
          Ricompensa: {{ challenge.reward }} punti
        </div>
        <div class="mt-2 flex justify-between">
          <button
            @click="updateChallengeProgress(challenge.id, 10)"
            class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition duration-300"
          >
            Aggiorna Progresso
          </button>
          <button
            @click="abandonChallenge(challenge.id)"
            class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition duration-300"
          >
            Abbandona
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Nessuna sfida attiva al momento. Iniziane una nuova!
    </div>
    <button
      @click="startNewChallenge"
      class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
    >
      Inizia Nuova Sfida
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 class="text-2xl font-semibold mb-4">Il Tuo Progresso</h2>
    <div class="flex justify-between items-center mb-4">
      <div>
        <p class="text-lg font-semibold">Livello {{ userLevel }}</p>
        <p class="text-sm text-gray-500">{{ userPoints }} punti totali</p>
      </div>
      <div class="w-1/2">
        <div class="bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            :style="{ width: `${levelProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-600">
      {{ pointsToNextLevel }} punti al prossimo livello
    </p>
  </div>

  <!-- Modal per iniziare una nuova sfida -->
  <div
    v-if="showNewChallengeModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Inizia una Nuova Sfida</h2>
      <div class="space-y-4">
        <div
          v-for="challenge in availableChallenges"
          :key="challenge.id"
          class="border p-4 rounded-lg"
        >
          <h3 class="text-lg font-semibold">{{ challenge.name }}</h3>
          <p class="text-sm text-gray-600">{{ challenge.description }}</p>
          <p class="text-sm font-medium mt-2">
            Ricompensa: {{ challenge.reward }} punti
          </p>
          <button
            @click="selectChallenge(challenge)"
            class="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition duration-300"
          >
            Seleziona
          </button>
        </div>
      </div>
      <button
        @click="showNewChallengeModal = false"
        class="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
      >
        Chiudi
      </button>
    </div>
  </div>
</template>
