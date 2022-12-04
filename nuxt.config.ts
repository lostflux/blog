// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default {
  head: {
    title: 'Altair: Personal Portfolio and Blog',
    titleTemplate: '%s - Altair',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Altair is a personal website for Siavava',
      }
    ],
    link: [ { rel: 'icon', type: 'image/svg', href: '/assets/connection.svg' } ],
    keywords: [ "engineering", "coding", "software", "portfolio", "art"],
    author: "Altair"
  
  },
  pwa: {
    icon: 'icon.png?v1'
  },
  typescript: {
    shim: false,
    strict: false,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/image-edge",
  ],
  content: {
    documentDriven: false,
    // base: "/content",
  },
  ssr: true,
  
  css: [
    "~/styles/raw-fonts.scss",
    "~/styles/typography.scss",
    "~/styles/colors.scss",
    "~/styles/default.sass",
    "~/styles/footer.sass",
    "~/styles/geometry.scss",
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
  compilerOptions: {
    isCustomElement: [
      'vue-freezeframe',
    ]
  },
  plugins: [
    { src: "~/plugins/resize.ts", mode: "client" },
    // { src: "~/plugins/reveal.ts", mode: "client", ssr: false },
  ],
  vue: {
    compilerOptions: {
      directiveTransforms: {
        resizetrack: () => ({
          props: [],
          needRuntime: false,
        }),
        // reveal: () => ({
        //   props: [],
        //   needRuntime: false,
        // })
      }
    }
  },
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
  },
}
