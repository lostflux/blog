import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: [
    // CSS file in the project
    '@/styles/_header.sass',
    '@/styles/_footer.sass',
    '@/styles/_error.sass',
    "@/styles/theme.sass"

  ]
})
