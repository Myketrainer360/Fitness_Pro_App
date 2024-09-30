import { ref, watch } from "vue";

const isDark = ref(localStorage.getItem("theme") === "dark");

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  watch(
    isDark,
    (newValue) => {
      document.documentElement.classList.toggle("dark", newValue);
    },
    { immediate: true }
  );

  return { isDark, toggleTheme };
}
