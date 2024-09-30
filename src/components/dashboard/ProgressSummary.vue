<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">I tuoi Progressi</h2>
    <div class="flex items-center justify-between mb-2">
      <span>Lezioni Completate</span>
      <span class="font-bold">{{ user.completedLessons }}</span>
    </div>
    <div class="flex items-center justify-between mb-2">
      <span>Minuti di Allenamento</span>
      <span class="font-bold">{{ user.totalMinutesWorkedOut }}</span>
    </div>
    <div class="flex items-center justify-between mb-2">
      <span>Calorie Bruciate</span>
      <span class="font-bold">{{ user.caloriesBurned }}</span>
    </div>
    <div class="flex items-center justify-between mt-4">
      <span>Lezione in Corso</span>
      <span class="font-bold">{{
        user.currentLesson ? user.currentLesson.title : "Nessuna"
      }}</span>
    </div>
    <div class="flex items-center justify-between mt-2">
      <span>Lezioni Prenotate</span>
      <span class="font-bold">{{ user.bookedLessons.length }}</span>
    </div>
  </div>
</template>
