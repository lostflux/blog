// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default {
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
    documentDriven: {
      // Will fetch navigation, page and surround.
      navigation: true,
      page: true,
      surround: true,
      // Will fetch `content/_theme.yml` and put it in `globals.theme` if present.
      // Will use `theme` global to search for a fallback `layout` key.
      layoutFallbacks: ['theme'],
      // Will inject `[...slug].vue` as the root page.
      injectPage: true,
      ignores: [
        'content/jobs',
      ],
    }    
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
