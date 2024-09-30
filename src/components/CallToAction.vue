<script setup>
const emit = defineEmits(["showModal"]);

const showSubscriptionModal = () => {
  emit("showModal");
};
</script>

<template>
  <section class="bg-blue-600 text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">
        Pronto a iniziare il tuo viaggio fitness?
      </h2>
      <p class="text-xl mb-8">
        Iscriviti ora e ottieni il 20% di sconto sulla tua prima lezione!
      </p>
      <button
        @click="showSubscriptionModal"
        class="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300"
      >
        Iscriviti ora
      </button>
    </div>
  </section>
</template>
