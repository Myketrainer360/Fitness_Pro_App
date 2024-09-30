<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import SearchAndFilter from "@/components/SearchAndFilter.vue";
import LessonGrid from "@/components/LessonGrid.vue";
import Pagination from "@/components/Pagination.vue";
import DailyLesson from "@/components/DailyLesson.vue";
import axios from "axios";

const cartStore = useCartStore();
const isDarkTheme = ref(false);
const lezioni = ref([]);
const lezionedelGiorno = ref(null);
const searchQuery = ref("");
const selectedCategory = ref("");
const sortBy = ref("popularity");
const currentPage = ref(1);
const itemsPerPage = 9;

const categories = ["Yoga", "Pilates", "Cardio", "Forza", "Danza"];

const PIXABAY_API_KEY = "45860031-ff44ee4f59ffbd2c00b7a303b"; // Sostituisci con la tua chiave API Pixabay
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 24 ore in millisecondi

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
        per_page: 10,
      },
    });
    if (response.data.hits.length > 0) {
      const imageUrl = response.data.hits[0].webformatURL;
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
    return `/api/placeholder/400/300`; // Immagine di fallback
  }
};

onMounted(async () => {
  const lezioniPromises = Array.from({ length: 20 }, async (_, i) => {
    const categoria = categories[Math.floor(Math.random() * categories.length)];
    const immagineUrl = await getImageWithCache(`${categoria} fitness`);
    return {
      id: i + 1,
      titolo: `Lezione ${i + 1}`,
      descrizione: "Descrizione breve della lezione...",
      categoria: categoria,
      prezzo: Math.floor(Math.random() * 30) + 10,
      durata: Math.floor(Math.random() * 30) + 30,
      popolarita: Math.floor(Math.random() * 100),
      immagine: immagineUrl,
    };
  });

  lezioni.value = await Promise.all(lezioniPromises);

  lezionedelGiorno.value = await generateLezionedelGiorno();
  lezionedelGiorno.value.prezzoScontato = lezionedelGiorno.value.prezzo * 0.6;
});

// Computed properties
const filteredAndSortedLessons = computed(() => {
  let result = lezioni.value.filter(
    (lezione) =>
      lezione.titolo.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (selectedCategory.value === "" ||
        lezione.categoria === selectedCategory.value)
  );

  switch (sortBy.value) {
    case "price_asc":
      result.sort((a, b) => a.prezzo - b.prezzo);
      break;
    case "price_desc":
      result.sort((a, b) => b.prezzo - a.prezzo);
      break;
    default:
      result.sort((a, b) => b.popolarita - a.popolarita);
  }

  return result;
});

const paginatedLessons = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredAndSortedLessons.value.slice(
    startIndex,
    startIndex + itemsPerPage
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedLessons.value.length / itemsPerPage)
);

// Metodi
const addToCart = (lezione, isLezionedelGiorno = false) => {
  const lezioneToAdd = { ...lezione };
  if (isLezionedelGiorno) {
    lezioneToAdd.prezzo = lezione.prezzoScontato;
    lezioneToAdd.titolo = `${lezione.titolo} (Offerta Speciale)`;
  }
  cartStore.addToCart(lezioneToAdd);
  alert(`${lezioneToAdd.titolo} aggiunto al carrello!`);
};

const generateLezionedelGiorno = async () => {
  const index = Math.floor(Math.random() * categories.length);
  const immagineUrl = await getImageWithCache(
    `${categories[index]} fitness special`
  );
  return {
    id: "special",
    titolo: `Lezione Speciale del Giorno: ${categories[index]}`,
    descrizione: "Approfitta di questa offerta esclusiva solo per oggi!",
    categoria: categories[index],
    prezzo: Math.floor(Math.random() * 20) + 30,
    prezzoScontato: 0,
    durata: Math.floor(Math.random() * 30) + 60,
    popolarita: 100,
    immagine: immagineUrl,
  };
};

const updateSearchQuery = (query) => {
  searchQuery.value = query;
};

const updateSelectedCategory = (category) => {
  selectedCategory.value = category;
};

const updateSortBy = (sort) => {
  sortBy.value = sort;
};

const updateCurrentPage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <div
    class="container mx-auto px-4 py-8"
    :class="{ 'dark-theme': isDarkTheme }"
  >
    <h1 class="text-4xl font-bold mb-8 text-center">
      Le nostre lezioni di fitness
    </h1>

    <SearchAndFilter
      :categories="categories"
      :selectedCategory="selectedCategory"
      :sortBy="sortBy"
      @updateSearch="updateSearchQuery"
      @updateCategory="updateSelectedCategory"
      @updateSort="updateSortBy"
    />

    <LessonGrid :lessons="paginatedLessons" @addToCart="addToCart">
      <template #default="{ lesson }">
        <div
          class="card p-4 md:p-6 bg-white shadow-md rounded-lg"
          :class="{ 'dark-card': isDarkTheme }"
        >
          <img
            :src="lesson.immagine"
            :alt="lesson.titolo"
            class="w-full h-40 md:h-48 lg:h-56 object-cover mb-4 rounded"
          />
          <h3
            class="text-xl md:text-2xl font-bold mb-2"
            :class="{ 'dark-card-title': isDarkTheme }"
          >
            {{ lesson.titolo }}
          </h3>
          <p
            class="text-gray-600 mb-4"
            :class="{ 'dark-card-text': isDarkTheme }"
          >
            {{ lesson.descrizione }}
          </p>
          <div class="flex justify-between items-center">
            <span
              class="text-lg md:text-xl font-bold"
              :class="{ 'dark-card-price': isDarkTheme }"
            >
              {{ lesson.prezzo }}€
            </span>
            <button
              @click="addToCart(lesson)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </template>
    </LessonGrid>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @updatePage="updateCurrentPage"
    />

    <DailyLesson
      v-if="lezionedelGiorno"
      :lesson="lezionedelGiorno"
      @addToCart="addToCart"
      class="mt-8"
    />
  </div>
</template>
