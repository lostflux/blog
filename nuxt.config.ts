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
  head: {
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      }
    ]
  },
  googleFonts: {
    families: {
      "DM": true, // [200, 300, 400, 500, 600, 700],
      // "DM Mono": true, //[200, 300, 400, 500, 600, 700],
    },
    // prefetch: true,
    download: true,
    base64: false,
    inject: true,
    fontsDir: "fonts",
    // base64: true,
    // inject: true,
    // fontsDir: "fonts",
    // fontsPath: "~assets/fonts",
    // stylePath: "styles/google-fonts.scss",
    // overwriting: false,
  },
  buildModules: [
    "@nuxtjs/google-fonts",
  ]
}
