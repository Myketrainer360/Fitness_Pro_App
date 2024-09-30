// src/stores/cartStore.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    cartTotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.prezzo * item.quantity,
        0
      );
    },
    cartSize: (state) => {
      return state.items.reduce((size, item) => size + item.quantity, 0);
    },
  },
  actions: {
    addToCart(lezione) {
      const existingItem = this.items.find((item) => item.id === lezione.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...lezione, quantity: 1 });
      }
    },
    removeFromCart(lezioneId) {
      const index = this.items.findIndex((item) => item.id === lezioneId);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});
