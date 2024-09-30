<script setup>
import { reactive } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "subscribe"]);

const form = reactive({
  name: "",
  email: "",
});

const submitForm = () => {
  emit("subscribe", { ...form });
  form.name = "";
  form.email = "";
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Iscriviti a FitnessPro</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nome</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Annulla
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Iscriviti
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
