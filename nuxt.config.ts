// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default {
  publicRuntimeConfig: {apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId:  process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
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
    },
    markdown: {
      remarkPlugins: [
        "remark-math"
      ],
      rehypePlugins: [
        "rehype-katex"
      ]
    },
    highlight: {
      theme: "github-dark",
      preload: [
        'bash',
        'c',
        'cpp',
        'java',
        'julia',
        'python',
        'haskell',
        'f#',
        'vue',
      ]
    }
  },
  ssr: true,

  link: [
    {
      hid: "icon",
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.png"
    }
  ],
  
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
      "DM+Sans": true, // [200, 300, 400, 500, 600, 700],
      "DM+Mono": true, //[200, 300, 400, 500, 600, 700],
      "Space+Mono": true, //[200, 300, 400, 500, 600, 700],
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    display: "swap",
    useStyleSheet: true,
    // download: true,
    // base64: false,
    // inject: true,
    // fontsDir: "fonts",
    // base64: true,
    // inject: true,
    // fontsDir: "fonts",
    // fontsPath: "~assets/fonts",
    // stylePath: "styles/google-fonts.scss",
    // overwriting: false,
  },
  buildModules: [

    // Google Fonts
    "@nuxtjs/google-fonts",

    // Nuxt Image
    "@nuxt/image",
  ],
  layouts: {
    default: "~/layouts/clean.vue",
    // error: "~/layouts/error.vue",
  },

  // router: {
  //   middleware: 'trailingSlashRedirect',
  //   trailingSlash: false,
  // },

  // redirect: [
  //   {
  //       from: '^[\\w\\.\\/]*(?<!\\/)(\\?.*\\=.*)*$',
  //       to: (from, req) => {
  //           const matches = req.url.match(/^.*(\?.*)$/)
  //           if (matches.length > 1) {
  //               return matches[0].replace(matches[1], '') + '/' + matches[1]
  //           }
  //           return matches[0]
  //       }
  //    }
  // ],
}
