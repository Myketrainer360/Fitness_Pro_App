<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineChart, Bar as BarChart } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const isModalOpen = ref(false);
const isWeightChartReady = ref(false);
const isWorkoutChartReady = ref(false);
const isCaloriesChartReady = ref(false);
const isStepsChartReady = ref(false);
const isSleepChartReady = ref(false);

const progressData = ref([
  {
    date: "2024-07-01",
    weight: 75,
    workoutDuration: 30,
    caloriesBurned: 300,
    steps: 8000,
    sleepHours: 7,
  },
  {
    date: "2024-07-08",
    weight: 74.5,
    workoutDuration: 45,
    caloriesBurned: 450,
    steps: 10000,
    sleepHours: 7.5,
  },
  {
    date: "2024-07-15",
    weight: 74.2,
    workoutDuration: 60,
    caloriesBurned: 600,
    steps: 12000,
    sleepHours: 8,
  },
  {
    date: "2024-07-22",
    weight: 73.8,
    workoutDuration: 40,
    caloriesBurned: 400,
    steps: 9000,
    sleepHours: 6.5,
  },
  {
    date: "2024-07-29",
    weight: 73.5,
    workoutDuration: 50,
    caloriesBurned: 500,
    steps: 11000,
    sleepHours: 7.5,
  },
]);

const formData = reactive({
  date: new Date().toISOString().split("T")[0],
  weight: "",
  workoutDuration: "",
  caloriesBurned: "",
  steps: "",
  sleepHours: "",
});

const createChartData = (label, color, dataKey) => ({
  labels: progressData.value.map((d) => d.date),
  datasets: [
    {
      label,
      backgroundColor: color,
      borderColor: color,
      data: progressData.value.map((d) => d[dataKey]),
    },
  ],
});

const weightChartData = ref(createChartData("Peso (kg)", "#f87979", "weight"));
const workoutChartData = ref(
  createChartData("Durata Allenamento (minuti)", "#7979f8", "workoutDuration")
);
const caloriesChartData = ref(
  createChartData("Calorie Bruciate", "#79f879", "caloriesBurned")
);
const stepsChartData = ref(createChartData("Passi", "#f8b179", "steps"));
const sleepChartData = ref(
  createChartData("Ore di Sonno", "#79c1f8", "sleepHours")
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const updateChartData = () => {
  weightChartData.value = createChartData("Peso (kg)", "#f87979", "weight");
  workoutChartData.value = createChartData(
    "Durata Allenamento (minuti)",
    "#7979f8",
    "workoutDuration"
  );
  caloriesChartData.value = createChartData(
    "Calorie Bruciate",
    "#79f879",
    "caloriesBurned"
  );
  stepsChartData.value = createChartData("Passi", "#f8b179", "steps");
  sleepChartData.value = createChartData(
    "Ore di Sonno",
    "#79c1f8",
    "sleepHours"
  );

  isWeightChartReady.value = true;
  isWorkoutChartReady.value = true;
  isCaloriesChartReady.value = true;
  isStepsChartReady.value = true;
  isSleepChartReady.value = true;
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = () => {
  progressData.value.push({
    date: formData.date,
    weight: parseFloat(formData.weight) || null,
    workoutDuration: parseInt(formData.workoutDuration) || null,
    caloriesBurned: parseInt(formData.caloriesBurned) || null,
    steps: parseInt(formData.steps) || null,
    sleepHours: parseFloat(formData.sleepHours) || null,
  });

  progressData.value.sort((a, b) => new Date(a.date) - new Date(b.date));
  updateChartData();

  closeModal();
  Object.keys(formData).forEach((key) => {
    formData[key] =
      key === "date" ? new Date().toISOString().split("T")[0] : "";
  });
};

watch(progressData, updateChartData, { immediate: true, deep: true });

onMounted(() => {
  updateChartData();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Tracker dei Progressi</h1>

    <!-- Grafico Peso -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Andamento del Peso</h2>
      <div class="h-64">
        <LineChart
          v-if="isWeightChartReady"
          :data="weightChartData"
          :options="chartOptions"
        />
        <p v-else class="text-center text-gray-500 py-8">
          Caricamento del grafico...
        </p>
      </div>
    </div>

    <!-- Grafico Allenamenti -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Andamento degli Allenamenti</h2>
      <div class="h-64">
        <BarChart
          v-if="isWorkoutChartReady"
          :data="workoutChartData"
          :options="chartOptions"
        />
        <p v-else class="text-center text-gray-500 py-8">
          Caricamento del grafico...
        </p>
      </div>
    </div>

    <!-- Grafico Calorie -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Calorie Bruciate</h2>
      <div class="h-64">
        <LineChart
          v-if="isCaloriesChartReady"
          :data="caloriesChartData"
          :options="chartOptions"
        />
        <p v-else class="text-center text-gray-500 py-8">
          Caricamento del grafico...
        </p>
      </div>
    </div>

    <!-- Grafico Passi -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Conteggio Passi</h2>
      <div class="h-64">
        <BarChart
          v-if="isStepsChartReady"
          :data="stepsChartData"
          :options="chartOptions"
        />
        <p v-else class="text-center text-gray-500 py-8">
          Caricamento del grafico...
        </p>
      </div>
    </div>

    <!-- Grafico Sonno -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Ore di Sonno</h2>
      <div class="h-64">
        <LineChart
          v-if="isSleepChartReady"
          :data="sleepChartData"
          :options="chartOptions"
        />
        <p v-else class="text-center text-gray-500 py-8">
          Caricamento del grafico...
        </p>
      </div>
    </div>

    <button
      @click="openModal"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Aggiungi Nuovo Dato
    </button>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Aggiungi Nuovo Dato</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700"
              >Data</label
            >
            <input
              type="date"
              id="date"
              v-model="formData.date"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label for="weight" class="block text-sm font-medium text-gray-700"
              >Peso (kg)</label
            >
            <input
              type="number"
              id="weight"
              v-model="formData.weight"
              step="0.1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label
              for="workoutDuration"
              class="block text-sm font-medium text-gray-700"
              >Durata Allenamento (minuti)</label
            >
            <input
              type="number"
              id="workoutDuration"
              v-model="formData.workoutDuration"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label
              for="caloriesBurned"
              class="block text-sm font-medium text-gray-700"
              >Calorie Bruciate</label
            >
            <input
              type="number"
              id="caloriesBurned"
              v-model="formData.caloriesBurned"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label for="steps" class="block text-sm font-medium text-gray-700"
              >Passi</label
            >
            <input
              type="number"
              id="steps"
              v-model="formData.steps"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label
              for="sleepHours"
              class="block text-sm font-medium text-gray-700"
              >Ore di Sonno</label
            >
            <input
              type="number"
              id="sleepHours"
              v-model="formData.sleepHours"
              step="0.1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Annulla
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
