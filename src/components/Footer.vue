<script setup>
import { ref, inject } from "vue";

const { isDark } = inject("theme");

const email = ref("");

const subscribeNewsletter = () => {
  console.log("Iscrizione alla newsletter:", email.value);
  alert("Grazie per esserti iscritto alla nostra newsletter!");
  email.value = "";
};
</script>

<template>
  <footer class="footer" :class="{ 'dark-theme': isDark }">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Logo e descrizione -->
        <div class="footer-section">
          <h2 class="footer-logo">FitnessPro</h2>
          <p class="footer-description">
            Raggiungi i tuoi obiettivi di fitness con i nostri programmi
            personalizzati e le lezioni online.
          </p>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg
                class="social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg
                class="social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg
                class="social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Collegamenti rapidi -->
        <div class="footer-section">
          <h3 class="footer-heading">Collegamenti Rapidi</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Home</a></li>
            <li><a href="#" class="footer-link">Lezioni</a></li>
            <li><a href="#" class="footer-link">Programmi</a></li>
            <li><a href="#" class="footer-link">Blog</a></li>
            <li><a href="#" class="footer-link">Contatti</a></li>
          </ul>
        </div>

        <!-- Contatti -->
        <div class="footer-section">
          <h3 class="footer-heading">Contattaci</h3>
          <ul class="footer-contact-list">
            <li class="footer-contact-item">
              <svg
                class="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>123 Via del Fitness, Roma, Italia</span>
            </li>
            <li class="footer-contact-item">
              <svg
                class="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span>+39 06 1234567</span>
            </li>
            <li class="footer-contact-item">
              <svg
                class="contact-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <span>info@fitnesspro.com</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer-section">
          <h3 class="footer-heading">Newsletter</h3>
          <p class="footer-description">
            Iscriviti per ricevere le ultime novità e offerte speciali.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input
              type="email"
              v-model="email"
              placeholder="La tua email"
              class="newsletter-input"
              required
            />
            <button type="submit" class="newsletter-button">Iscriviti</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; {{ new Date().getFullYear() }} FitnessPro. Tutti i diritti
          riservati.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
  padding: 3rem 0 1.5rem;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-section {
  margin-bottom: 2rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.footer-description {
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: var(--color-text-dark);
  transition: color 0.3s;
}

.social-link:hover {
  color: var(--color-primary);
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

.footer-links {
  list-style-type: none;
  padding: 0;
}

.footer-link {
  color: var(--color-text-dark);
  text-decoration: none;
  transition: color 0.3s;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.footer-link:hover {
  color: var(--color-primary);
}

.footer-contact-list {
  list-style-type: none;
  padding: 0;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.contact-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.newsletter-input {
  background-color: var(--color-background-soft);
  color: var(--color-text-dark);
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.newsletter-button {
  background-color: var(--color-primary);
  color: var(--vt-c-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-button:hover {
  background-color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-dark);
}

/* Stili per il tema scuro */
.dark-theme {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
}

.dark-theme .footer-link,
.dark-theme .social-link,
.dark-theme .footer-contact-item {
  color: var(--color-text-dark);
}

.dark-theme .newsletter-input {
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
}

.dark-theme .newsletter-button {
  background-color: var(--color-accent);
  color: var(--color-text-dark);
}

.dark-theme .newsletter-button:hover {
  background-color: var(--color-primary);
}
</style>
