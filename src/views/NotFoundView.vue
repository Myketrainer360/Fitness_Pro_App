<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">Oops! Pagina non trovata</p>
      <p class="text-gray-500 mb-8">
        La pagina che stai cercando potrebbe essere stata rimossa, aver cambiato
        nome o essere temporaneamente non disponibile.
      </p>
      <router-link
        to="/"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Torna alla Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Non è necessaria logica aggiuntiva per questo componente
</script>
