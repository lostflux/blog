// import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: false,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
  ],
  content: {
    documentDriven: false,
    base: "/content",
  },
  ssr: true,
  
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
    "~/styles/transitions.sass",
  ],
  components: {
    dirs: [
      "~/components/icons",
      '~/components/atoms',
      '~/components/molecules',
      '~/components',
    ]
  },
})
