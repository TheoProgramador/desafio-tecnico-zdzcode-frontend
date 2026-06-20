export default defineNuxtConfig({
  compatibilityDate: '2026-06-19',
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5192/api'
    }
  },
  typescript: {
    strict: true
  }
})
