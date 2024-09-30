<script setup>
const props = defineProps(["currentPage", "totalPages"]);
const emit = defineEmits(["updatePage"]);

const changePage = (page) => {
  emit("updatePage", page);
};
</script>

<template>
  <div class="mt-8 flex justify-center">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'mx-1 px-3 py-1 rounded',
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>
