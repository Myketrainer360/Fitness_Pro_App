<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const subtotale = computed(() => cartStore.cartTotal);
const iva = computed(() => subtotale.value * 0.22);
const totale = computed(() => subtotale.value + iva.value);

const procediAlPagamento = () => {
  // Implementa la logica per procedere al pagamento
  console.log("Procedendo al pagamento...");
};
/*
const carrello = ref([
  {
    id: 1,
    titolo: "Yoga per principianti",
    prezzo: 19.99,
    immagine: "/api/placeholder/100/100",
  },
  {
    id: 2,
    titolo: "Allenamento HIIT",
    prezzo: 24.99,
    immagine: "/api/placeholder/100/100",
  },
]);

const subtotale = computed(() => {
  return carrello.value.reduce((acc, item) => acc + item.prezzo, 0);
});

const iva = computed(() => subtotale.value * 0.22);
const totale = computed(() => subtotale.value + iva.value);

const rimuoviDalCarrello = (id) => {
  carrello.value = carrello.value.filter((item) => item.id !== id);
};

const procediAlPagamento = () => {
  // Implementa la logica per procedere al pagamento
  console.log("Procedendo al pagamento...");
};
*/
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Il tuo carrello</h1>

    <div
      v-if="cartStore.items.length > 0"
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <!-- Lista degli articoli nel carrello -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Articoli nel carrello</h2>
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex items-center justify-between border-b py-4 last:border-b-0"
          >
            <div class="flex items-center">
              <img
                :src="item.immagine"
                :alt="item.titolo"
                class="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <h3 class="text-lg font-semibold">{{ item.titolo }}</h3>
                <p class="text-gray-600">
                  €{{ item.prezzo.toFixed(2) }} x {{ item.quantity }}
                </p>
              </div>
            </div>
            <div class="flex items-center">
              <button
                @click="cartStore.addToCart(item)"
                class="text-blue-500 hover:text-blue-600 mr-2"
              >
                <span class="sr-only">Aggiungi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button @click="cartStore.removeFromCart(item.id)" class="">
                <span class="sr-only">Rimuovi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Riepilogo del carrello -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Riepilogo ordine</h2>
          <div class="flex justify-between mb-2 text-black">
            <span>Subtotale</span>
            <span>€{{ subtotale.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mb-2 text-black">
            <span>IVA (22%)</span>
            <span>€{{ iva.toFixed(2) }}</span>
          </div>
          <div class="border-t pt-2 mt-2 text-black">
            <div class="flex justify-between items-center font-bold text-lg">
              <span>Totale</span>
              <span>€{{ totale.toFixed(2) }}</span>
            </div>
          </div>
          <button
            @click="procediAlPagamento"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
          >
            Procedi al pagamento
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 text-gray-400 mx-auto mb-4"
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
      <h2 class="text-2xl font-semibold mb-2">Il tuo carrello è vuoto</h2>
      <p class="text-gray-600 mb-4">
        Sembra che non hai ancora aggiunto nessuna lezione al carrello.
      </p>
      <router-link
        to="/lezioni"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Sfoglia le lezioni
      </router-link>
    </div>
  </div>
</template>
