<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const formIscrizione = ref({
  nome: "",
  email: "",
});

const inviaIscrizione = () => {
  emit("submit", formIscrizione.value);
  console.log("Iscrizione inviata:", formIscrizione.value);
  alert("Grazie per la tua iscrizione! Ti contatteremo presto.");
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-lg max-w-md w-full">
      <h3 class="text-2xl font-bold mb-4">Iscriviti a FitnessPro</h3>
      <form @submit.prevent="inviaIscrizione">
        <div class="mb-4">
          <label for="nome" class="block mb-2 text-black">Nome</label>
          <input
            v-model="formIscrizione.nome"
            type="text"
            id="nome"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-black">Email</label>
          <input
            v-model="formIscrizione.email"
            type="email"
            id="email"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="mr-4 text-gray-600 hover:text-gray-800"
          >
            Annulla
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            Iscriviti
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
