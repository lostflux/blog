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
    "~/styles/about.sass",
    "~/styles/colors.scss",
    "~/styles/default.sass",
    "~/styles/error.sass",
    "~/styles/footer.sass",
    "~/styles/geometry.scss",
    "~/styles/header.sass",
    "~/styles/index.sass",
    "~/styles/main.sass",
    "~/styles/palettes.sass",
    "~/styles/theme.sass",
    "~/styles/typography.scss",
    "~/styles/fonts.scss",
  ],
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components',
    ]
  },
})
