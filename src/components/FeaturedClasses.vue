<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  lezioniEvidenza: Array,
});

const lezioniConImmagini = ref([]);

const PIXABAY_API_KEY = "45860031-ff44ee4f59ffbd2c00b7a303b";
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 ora in millisecondi

// Funzione per ottenere un'immagine casuale, con caching
const getRandomImageWithCache = async (query) => {
  const cacheKey = `pixabay_images_${query}`;
  const cachedImages = localStorage.getItem(cacheKey);

  if (cachedImages) {
    try {
      const { urls, timestamp } = JSON.parse(cachedImages);
      if (Date.now() - timestamp < CACHE_DURATION && urls.length > 0) {
        return urls[Math.floor(Math.random() * urls.length)];
      }
    } catch (error) {
      console.error("Errore nel parsing della cache:", error);
    }
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        per_page: 10,
      },
    });

    if (response.data && response.data.hits && response.data.hits.length > 0) {
      const imageUrls = response.data.hits.map((hit) => hit.webformatURL);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ urls: imageUrls, timestamp: Date.now() })
      );
      return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    } else {
      console.warn("Nessuna immagine trovata per la query:", query);
      return "/api/placeholder/400/300"; // Immagine di fallback
    }
  } catch (error) {
    console.error("Errore nel caricamento dell'immagine da Pixabay:", error);
    return "/api/placeholder/400/300"; // Immagine di fallback
  }
};

onMounted(async () => {
  try {
    const lezioniPromises = props.lezioniEvidenza.map(async (lezione) => {
      try {
        const immagine = await getRandomImageWithCache(
          `${lezione.titolo} fitness`
        );
        return { ...lezione, immagine };
      } catch (error) {
        console.error(
          `Errore nel caricamento dell'immagine per la lezione "${lezione.titolo}":`,
          error
        );
        return { ...lezione, immagine: "/api/placeholder/400/300" };
      }
    });

    lezioniConImmagini.value = await Promise.all(lezioniPromises);
  } catch (error) {
    console.error("Errore nel caricamento delle lezioni:", error);
    lezioniConImmagini.value = props.lezioniEvidenza.map((lezione) => ({
      ...lezione,
      immagine: "/api/placeholder/400/300",
    }));
  }
});
</script>

<template>
  <section class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8 text-center">Lezioni in evidenza</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="lezione in lezioniConImmagini"
        :key="lezione.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="lezione.immagine"
          :alt="lezione.titolo"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{{ lezione.titolo }}</h3>
          <p class="text-gray-600 mb-4">{{ lezione.descrizione }}</p>
          <router-link
            :to="'/lezioni/' + lezione.id"
            class="text-blue-600 hover:underline"
            >Scopri di più</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
