<script setup>
defineProps({
  lessons: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["book-lesson"]);

const bookLesson = (lessonId) => {
  emit("book-lesson", lessonId);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 col-span-full">
    <h2 class="text-xl font-semibold mb-4">Lezioni Consigliate per Te</h2>
    <div
      v-if="lessons.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
      >
        <h3 class="font-bold mb-2">{{ lesson.title }}</h3>
        <p class="text-gray-600 mb-2">{{ lesson.description }}</p>
        <p class="text-sm text-gray-500 mb-3">Durata: {{ lesson.duration }} minuti</p>
        <button
          @click="bookLesson(lesson.id)"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Prenota Ora
        </button>
      </div>
    </div>
    <p v-else class="text-gray-600 text-center">
      Al momento non ci sono lezioni consigliate. Controlla più tardi per nuove proposte!
    </p>
  </div>
</template>
