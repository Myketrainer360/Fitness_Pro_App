<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const nome = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const isFormValid = computed(() => {
  return (
    nome.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

const register = async () => {
  try {
    console.log("Dati di registrazione:", {
      nome: nome.value,
      email: email.value,
      password: password.value,
    });
    const response = await axios.post("http://localhost:5000/api/auth/register", {
      nome: nome.value,
      email: email.value,
      password: password.value,
    });
    console.log("Risposta dal server:", response.data);
    localStorage.setItem("token", response.data.token);
    router.push("/profile");
  } catch (err) {
    console.error("Errore completo:", err);
    error.value = err.response?.data?.message || "Errore durante la registrazione";
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Registrazione</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input v-model="nome" type="text" id="nome" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Conferma Password</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required />
      </div>
      <button type="submit" :disabled="!isFormValid">Registrati</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
