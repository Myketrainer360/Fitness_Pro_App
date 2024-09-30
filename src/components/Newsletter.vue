<script setup>
import { ref } from "vue";

const emit = defineEmits(["subscribe"]);
const email = ref("");

const iscriviNewsletter = () => {
  emit("subscribe", email.value);
  email.value = "";
};
</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Rimani aggiornato</h2>
      <p class="text-xl mb-8">
        Iscriviti alla nostra newsletter per ricevere consigli sul fitness,
        offerte esclusive e molto altro!
      </p>
      <form
        @submit.prevent="iscriviNewsletter"
        class="flex flex-col sm:flex-row gap-4"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Il tuo indirizzo email"
          required
          class="flex-grow px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Iscriviti
        </button>
      </form>
    </div>
  </section>
</template>
