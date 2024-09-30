import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import LezioniView from "@/views/LezioniView.vue";
import LezioneDettaglioView from "@/views/LezioneDettaglioView.vue";
import CarrelloView from "@/views/CarrelloView.vue";
import UserDashboardView from "@/views/UserDashboardView.vue";
import WorkoutProgramGeneratorView from "@/views/WorkoutProgramGeneratorView.vue";
import WorkoutProgramViewerView from "@/views/WorkoutProgramViewerView.vue";
import ProgressTrackerWithModalView from "@/views/ProgressTrackerWithModalView.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/lezioni",
    name: "Lezioni",
    component: LezioniView,
  },
  {
    path: "/lezioni/:id",
    name: "LezioneDettaglio",
    component: LezioneDettaglioView,
    props: true, // Questo permette di passare i parametri dell'URL come props al componente
  },
  {
    path: "/carrello",
    name: "Carrello",
    component: CarrelloView,
  },
  {
    path: "/dashboard",
    name: "UserDashboard",
    component: UserDashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-workout-program",
    name: "CreateWorkoutProgram",
    component: WorkoutProgramGeneratorView,
    meta: { requiresAuth: true },
  },
  {
    path: "/workout-program",
    name: "WorkoutProgram",
    component: WorkoutProgramViewerView,
    beforeEnter: (to, from, next) => {
      const savedProgram = localStorage.getItem("workoutProgram");
      if (savedProgram) {
        next();
      } else {
        next({ name: "CreateWorkoutProgram" });
      }
    },
  },
  {
    path: "/progress-tracker-with-modal",
    name: "ProgressTrackerWithModal",
    component: ProgressTrackerWithModalView,
  },
  // Rotta per gestire pagine non trovate
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && !authStore.isAuthenticated) {
    next("/profile");
  } else {
    next();
  }
});

export default router;
