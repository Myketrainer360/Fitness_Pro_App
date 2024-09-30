<script setup>
import { watch } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useTheme } from "@/composables/useTheme";
import { provide } from "vue";

const authStore = useAuthStore();
const router = useRouter();

// Carica l'utente all'avvio dell'app se c'è un token
if (authStore.token) {
  authStore.fetchUser();
}

// Osserva i cambiamenti nello stato di autenticazione
watch(
  () => authStore.isAuthenticated,
  (newValue) => {
    if (!newValue) {
      // L'utente è appena stato autenticato
      router.push("/profile"); // o qualsiasi altra pagina dopo il login
    } else {
      // L'utente è appena stato disconnesso
      router.push("/login");
    }
  }
);

const { isDark, toggleTheme } = useTheme();
provide("theme", { isDark, toggleTheme });
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDark }" class="app-container">
    <Header />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  /* Assicurati che queste variabili siano definite qui o in un file CSS separato importato globalmente */
  --color-primary: var(--fitness-primary);
  --color-secondary: var(--fitness-secondary);
  --color-accent: var(--fitness-accent);
  --color-background-light: var(--fitness-light);
  --color-background-dark: var(--fitness-dark);
  --color-text-light: var(--vt-c-text-light-1);
  --color-text-dark: var(--vt-c-text-dark-1);
}

html,
body,
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  min-height: 100vh;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--color-text-light);
  background-color: var(--color-background-light);
  transition: color 0.3s, background-color 0.3s;
}

.app-container.dark-theme {
  color: var(--color-text-dark);
  background-color: var(--color-background-dark);
}

.main-content {
  flex-grow: 1;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Stili globali per elementi comuni */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--color-primary);
}

a {
  color: var(--color-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: var(--color-accent);
}

button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--color-accent);
}

/* Classi di utilità */
.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.bg-primary {
  background-color: var(--color-primary);
}

.bg-secondary {
  background-color: var(--color-secondary);
}
</style>
