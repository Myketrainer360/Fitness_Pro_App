<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cartStore";
import axios from "axios";

const route = useRoute();
const cartStore = useCartStore();
const lezione = ref(null);
const PIXABAY_API_KEY = "45860031-ff44ee4f59ffbd2c00b7a303b"; // Sostituisci con la tua chiave API Pixabay
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 ore in millisecondi

const getImageWithCache = async (query) => {
  const cacheKey = `pixabay_image_${query}`;
  const cachedImage = localStorage.getItem(cacheKey);

  if (cachedImage) {
    const { url, timestamp } = JSON.parse(cachedImage);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return url;
    }
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        per_page: 3,
      },
    });
    if (response.data.hits.length > 0) {
      const imageUrl = response.data.hits[0].largeImageURL; // Usiamo largeImageURL per una qualità migliore
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ url: imageUrl, timestamp: Date.now() })
      );
      return imageUrl;
    } else {
      throw new Error("Nessuna immagine trovata");
    }
  } catch (error) {
    console.error("Errore nel caricamento dell'immagine da Pixabay:", error);
    return "/api/placeholder/800/400"; // Immagine di fallback
  }
};

onMounted(async () => {
  // Simula il caricamento dei dati da un'API
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simula un ritardo di rete

  const immagineUrl = await getImageWithCache(
    `Lezione ${route.params.id} fitness`
  );

  lezione.value = {
    id: parseInt(route.params.id),
    titolo: `Lezione ${route.params.id}`,
    descrizione: "Una descrizione dettagliata della lezione...",
    durata: 60,
    prezzo: 29.99,
    immagine: immagineUrl,
    livello: "Intermedio",
    istruttore: "Jane Doe",
    categoria: "Fitness",
  };
});

const aggiungiAlCarrello = () => {
  if (lezione.value) {
    cartStore.addToCart(lezione.value);
    alert(`${lezione.value.titolo} aggiunto al carrello!`);
  }
};
</script>

<template>
  <div v-if="lezione" class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        :src="lezione.immagine"
        :alt="lezione.titolo"
        class="w-full h-64 object-cover"
      />
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">{{ lezione.titolo }}</h1>
        <p class="text-gray-600 mb-4">{{ lezione.descrizione }}</p>
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-lg font-semibold">
              Durata: {{ lezione.durata }} minuti
            </p>
            <p class="text-2xl font-bold text-blue-600">
              €{{ lezione.prezzo.toFixed(2) }}
            </p>
          </div>
          <button
            @click="aggiungiAlCarrello"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            Aggiungi al carrello
          </button>
        </div>
        <div class="border-t pt-4">
          <h2 class="text-xl font-semibold mb-2">Dettagli della lezione</h2>
          <ul class="list-disc list-inside text-gray-600">
            <li>Livello: {{ lezione.livello }}</li>
            <li>Istruttore: {{ lezione.istruttore }}</li>
            <li>Categoria: {{ lezione.categoria }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto px-4 py-8 text-center">
    <p class="text-xl text-gray-600">Caricamento...</p>
  </div>
</template>
