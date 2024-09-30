<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";
import CallToAction from "@/components/CallToAction.vue";
import WorkoutForm from "@/components/WorkoutForm.vue";
import GeneratedProgram from "@/components/GeneratedProgram.vue";
import SubscriptionModalI from "@/components/SubscriptionModalI.vue";

const authStore = useAuthStore();
const router = useRouter();

const API_URL = "http://localhost:5000/api"; // Assicurati che questo corrisponda all'URL del tuo backend

const goals = ref([]);
const fitnessLevels = ref([]);
const workoutTypes = ref([]);

const formData = ref({
  goal: "",
  fitnessLevel: "",
  frequency: 3,
  preferredWorkouts: [],
  duration: 30,
});

const generatedProgram = ref(null);

const generateProgram = async () => {
  const dataToSend = {
    goal: formData.value.goal,
    fitnessLevel: formData.value.fitnessLevel,
    frequency: Number(formData.value.frequency),
    preferredWorkouts: Array.from(formData.value.preferredWorkouts),
    duration: Number(formData.value.duration),
  };
  console.log("Dati inviati per la generazione:", dataToSend);
  try {
    const response = await axios.post(`${API_URL}/programs/generate`, dataToSend);
    console.log("Risposta del server:", response.data);
    generatedProgram.value = response.data;
  } catch (error) {
    console.error(
      "Errore nella generazione del programma:",
      error.response?.data || error.message
    );
    alert(
      "Si è verificato un errore durante la generazione del programma. Controlla la console per i dettagli."
    );
  }
};

const saveAndNavigate = () => {
  console.log("Saving program and navigating to WorkoutProgram");
  const programToSave = JSON.stringify(generatedProgram.value);
  localStorage.setItem("workoutProgram", programToSave);
  router.push({ name: "WorkoutProgram" });
};

const saveProgram = async () => {
  try {
    console.log("Tentativo di salvare il programma:", generatedProgram.value);
    const response = await axios.post(`${API_URL}/programs/save`, {
      program: generatedProgram.value,
    });
    console.log("Risposta dal server:", response.data);
    alert("Programma salvato con successo!");
  } catch (error) {
    console.error(
      "Errore nel salvataggio del programma:",
      error.response?.data || error.message
    );
    alert(
      "Si è verificato un errore durante il salvataggio del programma. Riprova più tardi."
    );
  }
};

const isModalOpen = ref(false);
const subscriptionForm = reactive({
  name: "",
  email: "",
});

const mostraModaleIscrizione = () => {
  isModalOpen.value = true;
};

const chiudiModale = () => {
  isModalOpen.value = false;
  subscriptionForm.name = "";
  subscriptionForm.email = "";
};

const inviaIscrizione = async () => {
  try {
    await axios.post(`${API_URL}/users/subscribe`, subscriptionForm);
    alert(
      `Grazie per la tua iscrizione, ${subscriptionForm.name}! Ti contatteremo presto all'indirizzo ${subscriptionForm.email}.`
    );
    chiudiModale();
  } catch (error) {
    console.error("Errore nell'iscrizione:", error);
    alert("Si è verificato un errore durante l'iscrizione. Riprova più tardi.");
  }
};

const loadInitialData = async () => {
  try {
    const [
      goalsResponse,
      fitnessLevelsResponse,
      workoutTypesResponse,
    ] = await Promise.all([
      axios.get(`${API_URL}/goals`),
      axios.get(`${API_URL}/fitness-levels`),
      axios.get(`${API_URL}/workout-types`),
    ]);

    goals.value = goalsResponse.data;
    fitnessLevels.value = fitnessLevelsResponse.data;
    workoutTypes.value = workoutTypesResponse.data;
  } catch (error) {
    console.error("Errore nel caricamento dei dati iniziali:", error);
    alert(
      "Si è verificato un errore nel caricamento dei dati. Assicurati che il server sia in esecuzione e ricarica la pagina."
    );
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }
});
onMounted(loadInitialData);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
      Crea il tuo Programma di Allenamento Personalizzato
    </h1>

    <div class="flex items-center justify-center">
      <WorkoutForm
        :formData="formData"
        :goals="goals"
        :fitnessLevels="fitnessLevels"
        :workoutTypes="workoutTypes"
        @update:formData="formData = $event"
        @generateProgram="generateProgram"
        class="mb-8 lg:mb-0"
      />

      <GeneratedProgram
        v-if="generatedProgram"
        :program="generatedProgram"
        :goal="formData.goal"
        :fitnessLevel="formData.fitnessLevel"
        :frequency="formData.frequency"
        :preferredWorkouts="formData.preferredWorkouts"
        :duration="formData.duration"
        @saveProgram="saveAndNavigate"
      />
    </div>

    <CallToAction
      @show-modal="mostraModaleIscrizione"
      class="mt-10 mb-10 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-8 max-w-4xl mx-auto"
    />

    <SubscriptionModalI
      :isOpen="isModalOpen"
      @close="chiudiModale"
      @subscribe="inviaIscrizione"
    />
  </div>
</template>
