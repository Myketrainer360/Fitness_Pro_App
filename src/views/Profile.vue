<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const user = ref(null);
const router = useRouter();
const isLoading = ref(true);
const error = ref(null);

const fetchUserProfile = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Nessun token trovato");
    }
    const response = await axios.get("http://localhost:5000/api/users/me", {
      headers: {
        "x-auth-token": token,
      },
    });
    user.value = response.data;
  } catch (err) {
    console.error(
      "Errore nel caricamento del profilo:",
      err.response?.data || err.message
    );
    // Gestisci l'errore (es. reindirizza al login se il token non è valido)
    error.value = "Impossibile caricare il profilo. Per favore, riprova più tardi.";
    if (err.response?.status === 401) {
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchUserProfile);

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <h2 class="text-3xl font-bold text-white">Il tuo profilo</h2>
      </div>

      <div class="p-6">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>

        <div v-else-if="error" class="text-center text-red-600 p-4">
          {{ error }}
        </div>

        <div v-else-if="user" class="space-y-6">
          <div class="flex items-center space-x-4">
            <div class="bg-blue-100 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800">
                {{ user.nome }}
              </h3>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-2">I tuoi progressi</h4>
            <!-- Placeholder per i progressi dell'utente -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-600">I tuoi progressi verranno visualizzati qui.</p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-2">Prossimi obiettivi</h4>
            <!-- Placeholder per gli obiettivi dell'utente -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-600">
                I tuoi prossimi obiettivi verranno visualizzati qui.
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-600 p-4">
          Nessun dato utente disponibile.
        </div>
      </div>

      <div class="bg-gray-50 px-6 py-4 flex justify-end">
        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puoi aggiungere stili aggiuntivi qui se necessario */
</style>
