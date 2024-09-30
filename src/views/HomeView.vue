<script setup>
import { ref, inject } from "vue";
import axios from "axios"; // Importa axios per le chiamate API
import HeroSection from "@/components/HeroSection.vue";
import FeaturedClasses from "@/components/FeaturedClasses.vue";
import Testimonials from "@/components/Testimonials.vue";
import Newsletter from "@/components/Newsletter.vue";
import SubscriptionModal from "@/components/SubscriptionModal.vue";

const { isDark } = inject("theme");
const API_URL = "http://localhost:5000/api"; // Assicurati che questa sia l'URL corretta del tuo backend

const lezioniEvidenza = ref([
  {
    id: 1,
    titolo: "Yoga per principianti",
    descrizione:
      "Inizia il tuo viaggio nello yoga con questa lezione introduttiva.",
    immagine: "/api/placeholder/400/300",
  },
  {
    id: 2,
    titolo: "HIIT Cardio Blast",
    descrizione:
      "Brucia calorie e migliora la tua resistenza con questo allenamento intenso.",
    immagine: "/api/placeholder/400/300",
  },
  {
    id: 3,
    titolo: "Pilates per la postura",
    descrizione:
      "Migliora la tua postura e rafforza il core con questa lezione di Pilates.",
    immagine: "/api/placeholder/400/300",
  },
]);

const testimonianze = ref([
  {
    id: 1,
    nome: "Laura B.",
    ruolo: "Mamma lavoratrice",
    testo:
      "FitnessPro ha cambiato la mia vita! Le lezioni flessibili si adattano perfettamente al mio programma impegnativo.",
    avatar: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    nome: "Marco S.",
    ruolo: "Professionista",
    testo:
      "Gli istruttori sono fantastici e le lezioni sempre stimolanti. Ho visto risultati incredibili in poche settimane!",
    avatar: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    nome: "Giulia R.",
    ruolo: "Studentessa",
    testo:
      "Adoro la varietà delle lezioni. Non mi annoio mai e continuo a migliorare ogni giorno.",
    avatar: "/images/avatar-3.jpg",
  },
]);

const mostraModale = ref(false);
const emailNewsletter = ref("");
const formIscrizione = ref({
  nome: "",
  email: "",
});

const apriModaleIscrizione = () => {
  mostraModale.value = true;
};

const chiudiModale = () => {
  mostraModale.value = false;
  formIscrizione.value = { nome: "", email: "" };
};

const inviaIscrizione = async (datiIscrizione) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      nome: datiIscrizione.nome,
      email: datiIscrizione.email,
    });
    console.log("Risposta dal server:", response.data);
    alert("Grazie per la tua iscrizione! Ti contatteremo presto.");
    chiudiModale();
  } catch (error) {
    console.error(
      "Errore durante l'iscrizione:",
      error.response?.data || error
    );
    alert(
      `Si è verificato un errore durante l'iscrizione: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

const iscriviNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/newsletter/subscribe`, {
      email,
    });
    console.log("Iscrizione newsletter:", response.data);
    alert("Grazie per esserti iscritto alla nostra newsletter!");
    emailNewsletter.value = "";
  } catch (error) {
    console.error("Errore durante l'iscrizione alla newsletter:", error);
    alert(
      "Si è verificato un errore durante l'iscrizione alla newsletter. Riprova più tardi."
    );
  }
};
</script>

<template>
  <div class="main-container" :class="{ 'dark-theme': isDark }">
    <HeroSection @open-subscription="apriModaleIscrizione" />
    <FeaturedClasses
      :lezioniEvidenza="lezioniEvidenza"
      class="container mt-5 mb-5"
    />
    <Testimonials :testimonianze="testimonianze" class="container" />
    <Newsletter @subscribe="iscriviNewsletter" />

    <SubscriptionModal
      v-if="mostraModale"
      @close="chiudiModale"
      @submit="inviaIscrizione"
    />
  </div>
</template>

<style scoped>
.main-container {
  background-color: var(--color-background-light);
  color: var(--color-text);
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.main-container.dark-theme {
  background-color: var(--color-background-dark);
  color: var(--vt-c-text-dark-1);
}

:deep(.section-title) {
  color: var(--color-primary);
  font-size: 2rem;
  margin-bottom: 1rem;
}

:deep(.section-description) {
  color: var(--color-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

:deep(.btn-primary) {
  background-color: var(--color-primary);
  color: var(--vt-c-white);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

:deep(.btn-primary:hover) {
  background-color: var(--color-accent);
}

:deep(.card) {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: border-color 0.3s;
}

:deep(.card:hover) {
  border-color: var(--color-border-hover);
}

.dark-theme :deep(.card) {
  background-color: var(--color-background-soft);
}
</style>
