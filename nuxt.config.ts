import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: false
  },
  modules: [
    "@nuxt/content",
  ],
  
  css: [
    "~/styles/raw-fonts.scss",
    "~/styles/typography.scss",
    "~/styles/colors.scss",
    "~/styles/default.sass",
    "~/styles/error.sass",
    "~/styles/footer.sass",
    "~/styles/geometry.scss",
    "~/styles/index.sass",
    "~/styles/main.sass",
    "~/styles/palettes.sass",
    "~/styles/theme.sass",
  ],
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components',
    ]
  },
})
