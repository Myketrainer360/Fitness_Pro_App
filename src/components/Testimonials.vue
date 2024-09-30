<template>
  <section
    class="bg-gradient-to-r from-blue-500 to-indigo-600 py-20 text-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-12 text-center">
        Cosa dicono i nostri clienti
      </h2>
      <div v-if="hasTestimonials" class="relative max-w-3xl mx-auto">
        <transition name="fade" mode="out-in">
          <div
            v-if="currentTestimonianza"
            :key="currentTestimonianza.id"
            class="bg-white text-gray-800 p-8 rounded-lg shadow-lg"
          >
            <p class="text-xl italic mb-6">
              "{{ currentTestimonianza.testo }}"
            </p>
            <div class="flex items-center">
              <img
                :src="currentTestimonianza.avatar"
                :alt="currentTestimonianza.nome"
                class="w-16 h-16 rounded-full mr-4 border-2 border-indigo-500"
              />
              <div>
                <p class="font-semibold text-lg">
                  {{ currentTestimonianza.nome }}
                </p>
                <p class="text-indigo-600">{{ currentTestimonianza.ruolo }}</p>
              </div>
            </div>
          </div>
        </transition>

        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="(_, index) in props.testimonianze"
            :key="index"
            @click="setTestimonial(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              currentIndex === index
                ? 'bg-white scale-125'
                : 'bg-gray-300 hover:bg-gray-100',
            ]"
            :aria-label="`Vai alla testimonianza ${index + 1}`"
          ></button>
        </div>
      </div>
      <p v-else class="text-center text-xl">
        Al momento non ci sono testimonianze disponibili.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from "vue";

const props = defineProps({
  testimonianze: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);

const hasTestimonials = computed(
  () => props.testimonianze && props.testimonianze.length > 0
);

const currentTestimonianza = computed(() =>
  hasTestimonials.value ? props.testimonianze[currentIndex.value] : null
);

const setTestimonial = (index) => {
  currentIndex.value = index;
  resetAutoPlay();
};

const next = () => {
  if (hasTestimonials.value) {
    currentIndex.value = (currentIndex.value + 1) % props.testimonianze.length;
  }
};

let autoPlayInterval = null;

const startAutoPlay = () => {
  if (hasTestimonials.value && !autoPlayInterval) {
    autoPlayInterval = setInterval(next, 5000);
  }
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

watch(
  hasTestimonials,
  (newValue) => {
    if (newValue) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
