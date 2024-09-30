<script setup>
import { ref, inject, computed } from "vue";
import { useAuthStore } from "../stores/auth"; // Assicurati che il percorso sia corretto

// Store di autenticazione
const authStore = useAuthStore();
//const { isDark, toggleTheme } = inject("theme");
const theme = inject("theme", { isDark: ref(false), toggleTheme: () => {} });
const { isDark, toggleTheme } = theme;

// Stato autenticazione
const isAuthenticated = computed(() => !!authStore.isAuthenticated);

// Link di navigazione
const navLinks = computed(() => [
  { to: "/", text: "Home" },
  ...(isAuthenticated.value
    ? [
        { to: "/profile", text: "Profilo" },
        { to: "/create-workout-program", text: "Crea il tuo Programma" },
        { to: "/workout-program", text: "Programma Allenamento" },
        { to: "/dashboard", text: "Pannello di controllo" },
        { to: "/progress-tracker-with-modal", text: "Progress Tracker" },
      ]
    : [{ to: "/Login", text: "Login" }]),
  { to: "/lezioni", text: "Lezioni" },
  { to: "/carrello", text: "Carrello", icon: true },
]);

// Gestione menu
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Logout utente
const logout = async () => {
  try {
    await authStore.logout();
    closeMenu();
  } catch (error) {
    console.error("Errore durante il logout:", error);
  }
};
</script>

<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-content">
        <router-link to="/" class="logo">FitnessPro</router-link>
        <div class="nav-controls">
          <!-- Tema Toggle -->
          <button @click="toggleTheme" class="theme-toggle">
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sun-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="icon moon-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Hamburger menu per schermi piccoli -->
          <button @click="toggleMenu" class="menu-toggle text-red-500">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Menu per schermi grandi -->
        <div class="desktop-menu">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ active: $route.path === link.to }"
          >
            <template v-if="link.icon">
              <!-- Icona del carrello -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </template>
            <template v-else>
              {{ link.text }}
            </template>
          </router-link>
          <button v-if="isAuthenticated" @click="logout" class="nav-link logout-button">
            Logout
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-show="isMenuOpen" class="mobile-menu" @click.self="closeMenu">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="closeMenu"
          class="mobile-nav-link"
          :class="{ active: $route.path === link.to }"
        >
          <template v-if="link.icon">
            <div class="flex items-center">
              <!-- Icona del carrello per mobile -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {{ link.text }}
            </div>
          </template>
          <template v-else>
            {{ link.text }}
          </template>
        </router-link>
        <button
          v-if="isAuthenticated"
          @click="logout"
          class="mobile-nav-link logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: var(--color-background-light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-controls {
  display: flex;
  align-items: center;
}

.theme-toggle,
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.theme-toggle:hover,
.menu-toggle:hover {
  background-color: var(--color-background-soft);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.sun-icon {
  color: var(--color-warning);
}

.moon-icon {
  color: var(--color-secondary);
}

.desktop-menu {
  display: none;
}

.nav-link {
  color: var(--color-text-light);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

.mobile-nav-link {
  color: var(--color-text-light);
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s, color 0.3s;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .desktop-menu {
    display: flex;
    align-items: center;
  }

  .mobile-menu {
    display: none;
  }
}

.dark-theme .header {
  background-color: var(--color-background-dark);
}

.dark-theme .nav-link,
.dark-theme .mobile-nav-link {
  color: var(--color-text-dark);
}

.dark-theme .nav-link:hover,
.dark-theme .nav-link.active,
.dark-theme .mobile-nav-link:hover,
.dark-theme .mobile-nav-link.active {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
}

.logout-button {
  background-color: var(--color-danger);
  color: var(--color-text-light);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: var(--color-background-soft);
}

.dark-theme .logout-button {
  background-color: var(--color-danger-dark);
}

.dark-theme .logout-button:hover {
  background-color: var(--color-danger);
}
</style>
