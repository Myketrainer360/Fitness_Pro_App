<script setup>
import { ref } from "vue";

const props = defineProps({
  formData: Object,
  goals: Array,
  fitnessLevels: Array,
  workoutTypes: Array,
});

const emit = defineEmits(["update:formData", "generateProgram"]);

const updateFormData = (key, value) => {
  emit("update:formData", { ...props.formData, [key]: value });
};

const activeSection = ref("goal");

const sections = [
  { key: "goal", title: "Obiettivo" },
  { key: "fitnessLevel", title: "Livello di Fitness" },
  { key: "frequency", title: "Frequenza" },
  { key: "preferredWorkouts", title: "Tipo di Allenamento" },
  { key: "duration", title: "Durata" },
];

const nextSection = () => {
  const currentIndex = sections.findIndex((s) => s.key === activeSection.value);
  if (currentIndex < sections.length - 1) {
    activeSection.value = sections[currentIndex + 1].key;
  }
};

const prevSection = () => {
  const currentIndex = sections.findIndex((s) => s.key === activeSection.value);
  if (currentIndex > 0) {
    activeSection.value = sections[currentIndex - 1].key;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Crea il tuo programma di allenamento</h2>
      <p class="mt-2 text-blue-100">Personalizza il tuo percorso fitness</p>
    </div>

    <form @submit.prevent="$emit('generateProgram')" class="p-6 text-red-500">
      <div class="mb-6">
        <div
          class="flex justify-between text-sm font-medium text-gray-500 mb-2"
        >
          <span
            v-for="section in sections"
            :key="section.key"
            :class="{ 'text-blue-600': activeSection === section.key }"
          >
            {{ section.title }}
          </span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-blue-600 rounded-full"
            :style="{
              width: `${
                ((sections.findIndex((s) => s.key === activeSection) + 1) /
                  sections.length) *
                100
              }%`,
            }"
          ></div>
        </div>
      </div>

      <!-- Obiettivo principale -->
      <div v-if="activeSection === 'goal'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">
          Qual è il tuo obiettivo principale?
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="goal in goals" :key="goal.value" class="relative">
            <input
              type="radio"
              :id="goal.value"
              :value="goal.value"
              v-model="formData.goal"
              class="sr-only peer"
            />
            <label
              :for="goal.value"
              class="flex p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:border-transparent"
            >
              {{ goal.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Livello di fitness -->
      <div v-if="activeSection === 'fitnessLevel'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">
          Qual è il tuo livello di fitness attuale?
        </h3>
        <div class="space-y-2">
          <div
            v-for="level in fitnessLevels"
            :key="level.value"
            class="flex items-center"
          >
            <input
              v-model="formData.fitnessLevel"
              :id="level.value"
              :value="level.value"
              type="radio"
              class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              :for="level.value"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ level.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Frequenza allenamenti -->
      <div v-if="activeSection === 'frequency'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">
          Quante volte alla settimana vuoi allenarti?
        </h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
          <div v-for="n in 7" :key="n" class="relative">
            <input
              type="radio"
              :id="'frequency-' + n"
              :value="n"
              v-model="formData.frequency"
              class="sr-only peer"
            />
            <label
              :for="'frequency-' + n"
              class="flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:border-transparent"
            >
              {{ n }} {{ n === 1 ? "volta" : "volte" }}
            </label>
          </div>
        </div>
      </div>

      <!-- Preferenze di allenamento -->
      <div v-if="activeSection === 'preferredWorkouts'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">
          Che tipo di allenamenti preferisci?
        </h3>
        <p class="text-sm text-gray-500">
          Seleziona tutti quelli che ti interessano
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="workout in workoutTypes"
            :key="workout.value"
            class="flex items-center"
          >
            <input
              v-model="formData.preferredWorkouts"
              :id="workout.value"
              :value="workout.value"
              type="checkbox"
              class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              :for="workout.value"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ workout.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Durata sessione -->
      <div v-if="activeSection === 'duration'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">
          Quanto tempo vuoi dedicare a ogni sessione di allenamento?
        </h3>
        <select
          v-model="formData.duration"
          id="duration"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="15">15 minuti</option>
          <option value="30">30 minuti</option>
          <option value="45">45 minuti</option>
          <option value="60">1 ora</option>
          <option value="90">1 ora e 30 minuti</option>
        </select>
      </div>

      <div class="mt-8 flex justify-between">
        <button
          type="button"
          @click="prevSection"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="activeSection === sections[0].key"
        >
          Indietro
        </button>
        <button
          v-if="activeSection !== sections[sections.length - 1].key"
          type="button"
          @click="nextSection"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Avanti
        </button>
        <button
          v-else
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Genera il mio programma
        </button>
      </div>
    </form>
  </div>
</template>
