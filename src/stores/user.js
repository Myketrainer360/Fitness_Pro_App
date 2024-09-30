import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
  }),

  actions: {
    async Login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
        await this.fetchUser();
      } catch (error) {
        console.log("Errore di login:", error);
      }
      throw error;
    },

    async register(nome, email, password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            nome,
            email,
            password,
          }
        );
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
        await this.fetchUser();
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        throw error;
      }
    },
  },

  async fetchUser() {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        header: {
          "x-auth-token": this.token,
        },
      });
      this.user = response.data;
    } catch (error) {
      console.log("Errore nel recupero dati utenti:", error);
      this.logout();
    }
  },
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  },
});
