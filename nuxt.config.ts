export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
    families: [
      {
        name: "Fira Code",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
    ],
  },
  routeRules: {
    "/word-quest": {
      ssr: false,
    },
    "/lexibee": {
      ssr: false,
    },
  },
});
