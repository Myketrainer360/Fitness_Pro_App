// stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(email, password) {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      token.value = response.data.token;
      localStorage.setItem("token", token.value);
      await fetchUser();
      router.push("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function fetchUser() {
    if (token.value) {
      try {
        const response = await axios.get("/api/users/me", {
          headers: { "x-auth-token": token.value },
        });
        user.value = response.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      }
    }
  }

  async function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    // Non reindirizzare qui, lascia che sia il router a gestirlo
  }

  return { token, user, isAuthenticated, login, logout, fetchUser };
});
