<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const userPrograms = ref([]);

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser();
  }
  //Fetch user programs;
  const response = await axios.get("/api/programs/user");
  userPrograms.value = response.data;
});
</script>

<template>
  <div v-if="authStore.user">
    <h1>Benvenuto, {{ authStore.user.name }}</h1>
    <h2>I tuoi programmi</h2>
    <!-- Lista dei programmi dell'utente -->
    <h2>I tuoi obiettivi</h2>
    <!-- Obiettivi dell'utente -->
    <h2>I tuoi progressi</h2>
    <!-- Progressi dell'utente -->
  </div>
</template>
