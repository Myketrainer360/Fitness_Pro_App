<script setup>
const props = defineProps(["lessons"]);
const emit = defineEmits(["addToCart"]);

const addToCart = (lesson) => {
  emit("addToCart", lesson);
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="lezione in lessons"
      :key="lezione.id"
      class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <img
        :src="lezione.immagine"
        :alt="lezione.titolo"
        class="w-full h-48 object-cover"
      />
      <div class="p-4 sm:p-6">
        <h3 class="text-xl font-semibold mb-2">{{ lezione.titolo }}</h3>
        <p class="text-gray-600 mb-4">{{ lezione.descrizione }}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-bold"
            >€{{ lezione.prezzo.toFixed(2) }}</span
          >
          <span class="text-sm text-gray-500">{{ lezione.durata }} min</span>
        </div>
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <router-link
            :to="'/lezioni/' + lezione.id"
            class="text-blue-600 hover:underline w-full sm:w-auto text-center sm:text-left"
          >
            Dettagli
          </router-link>
          <button
            @click="addToCart(lezione)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
