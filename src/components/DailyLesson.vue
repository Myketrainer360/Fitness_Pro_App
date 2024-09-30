<script setup>
const props = defineProps(["lesson"]);
const emit = defineEmits(["addToCart"]);

const addToCart = () => {
  emit("addToCart", props.lesson, true);
};
</script>

<template>
  <section
    class="mt-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-8"
  >
    <h2 class="text-3xl font-bold mb-4">Lezione del giorno</h2>
    <div class="flex flex-col md:flex-row items-center">
      <img
        :src="lesson.immagine"
        :alt="lesson.titolo"
        class="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
      />
      <div>
        <h3 class="text-2xl font-semibold mb-2">
          {{ lesson.titolo }}
        </h3>
        <p class="mb-4">{{ lesson.descrizione }}</p>
        <p class="text-xl font-bold mb-4">
          Prezzo speciale: €{{ lesson.prezzoScontato.toFixed(2) }}
        </p>
        <button
          @click="addToCart"
          class="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 transition duration-300"
        >
          Aggiungi al carrello
        </button>
      </div>
    </div>
  </section>
</template>
