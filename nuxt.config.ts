import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: false
  },
  sass: [
    // CSS file in the project
    '@/styles/header.sass',
    '@/styles/footer.sass',
    '@/styles/error.sass',
    "@/styles/theme.sass",
    "@/styles/email.sass",
    "@/styles/colors.sass",
    "@/styles/fonts.sass",
    "@/styles/default.sass"
  ],
  modules: [
    "@nuxt/content",
    "@nuxtjs/google-fonts"
  ],

  buildModules: [
    "@nuxtjs/google-fonts"
  ],
  content: {
    
  },

  googleFonts: {
    prefetch: true,
    display: "fallback",
    families: {
      "DM Sans": true,
    }
  }
})
