import "./assets/main.css";
import "./assets/tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App);
app.use(createPinia());

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.use(router);

app.mount("#app");
