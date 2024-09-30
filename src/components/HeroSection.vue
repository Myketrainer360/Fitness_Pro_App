<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

const backgroundImage = ref("");
const PIXABAY_API_KEY = "45860031-ff44ee4f59ffbd2c00b7a303b"; // Sostituisci con la tua chiave API Pixabay

const fetchBackgroundImage = async () => {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        q: "fitness",
        image_type: "photo",
        orientation: "horizontal",
        per_page: 3,
      },
    });
    if (response.data.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.hits.length);
      backgroundImage.value = response.data.hits[randomIndex].largeImageURL;
    }
  } catch (error) {
    console.error("Errore nel caricamento dell'immagine da Pixabay:", error);
    backgroundImage.value = "https://source.unsplash.com/1600x900/?fitness";
  }
};

const handleParallax = () => {
  const scrollPosition = window.scrollY;
  const parallaxBg = document.querySelector(".parallax-bg");
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
};

const animateParticles = () => {
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--y", `${Math.random() * 100}%`);
    particle.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
    particle.style.setProperty("--delay", `${Math.random() * 2}s`);
  });
};

onMounted(async () => {
  await fetchBackgroundImage();
  window.addEventListener("scroll", handleParallax);
  animateParticles();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleParallax);
});

// Definisci l'emit per poter emettere eventi
const emit = defineEmits(["open-subscription"]);

// Nuova funzione per emettere l'evento open-subscription
const emitOpenSubscription = () => {
  emit("open-subscription");
};
</script>

<template>
  <section class="hero-section relative overflow-hidden">
    <div
      class="parallax-bg"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    <div class="particle-container">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>
    <div class="content-container relative z-10 text-center py-20 text-white">
      <h1 class="text-5xl font-bold mb-6">Benvenuto su FitnessPro</h1>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Scopri le nostre lezioni di fitness e inizia il tuo percorso verso una
        vita più sana e attiva!
      </p>
      <div class="flex justify-center space-x-4">
        <router-link
          to="/lezioni"
          class="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Esplora le lezioni
        </router-link>
        <button
          @click="emitOpenSubscription"
          class="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Iscriviti ora
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.5s ease-out;
}

.content-container {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 1rem;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  top: var(--y);
  left: var(--x);
  animation: float var(--duration) ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}
</style>
