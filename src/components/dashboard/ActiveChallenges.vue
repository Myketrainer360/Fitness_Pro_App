<script setup>
defineProps({
  challenges: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">Sfide Attive ({{ challenges.length }})</h2>
    <ul v-if="challenges.length > 0">
      <li v-for="challenge in challenges" :key="challenge.id" class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="font-medium">{{ challenge.name }}</span>
          <span class="text-green-500 font-bold">{{ challenge.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-green-500 h-2.5 rounded-full"
            :style="{ width: `${challenge.progress}%` }"
          ></div>
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-600">
      Nessuna sfida attiva. Unisciti a una sfida per motivarti!
    </p>
  </div>
</template>
