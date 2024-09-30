<script setup>
import { ref } from "vue";

const props = defineProps(["categories", "selectedCategory", "sortBy"]);
const emit = defineEmits(["updateSearch", "updateCategory", "updateSort"]);

const searchQuery = ref("");

const emitSearch = () => {
  emit("updateSearch", searchQuery.value);
};

const emitCategory = (event) => {
  emit("updateCategory", event.target.value);
};

const emitSort = (event) => {
  emit("updateSort", event.target.value);
};
</script>

<template>
  <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
    <div class="flex-grow">
      <input
        v-model="searchQuery"
        @input="emitSearch"
        type="text"
        placeholder="Cerca lezioni..."
        class="w-full px-4 py-2 text-red-500 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="flex gap-4">
      <select
        :value="selectedCategory"
        @change="emitCategory"
        class="px-4 py-2 text-red-500 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tutte le categorie</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select
        :value="sortBy"
        @change="emitSort"
        class="px-4 py-2 text-red-500 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="popularity">Popolarità</option>
        <option value="price_asc">Prezzo: Basso-Alto</option>
        <option value="price_desc">Prezzo: Alto-Basso</option>
      </select>
    </div>
  </div>
</template>
