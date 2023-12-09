export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },
  routeRules: {
    "/**": {
      prerender: true,
    },
  },
  app: {
    head: {
      title: "whatever",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f42e4f" },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "amittai" },
        { property: "og:locale", content: "en_US" },
        { name: "robots", content: "index, follow" },
        {
          hid: "description",
          name: "description",
          content: "Amittai's portfolio. A summary of his work, thoughts, and interests.",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg", href: "/favicon.svg" },
        {
          rel: "mask-icon", type: "image/svg", href: "/favicon.svg", color: "#f42e4f",
        },
        {
          rel: "apple-touch-icon", type: "image/svg", href: "/favicon.svg",
        },
      ],
    },
  },
  typescript: {
    shim: false,
    strict: false,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/devtools",
    "@pinia/nuxt",
    ["@nuxtjs/algolia", {
      applicationId: process.env.ALGOLIA_SEARCH_APP_ID,
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    }],
    ["@nuxtjs/robots", {
      UserAgent: "*",
      Disallow: "",
    }],
    "@nuxt/image",
  ],
  router: { },
  devtools: {
    enabled: true,
    vscode: {},
  },
  content: {
    sources: {
      content: {
        driver: "github",
        repo: "siavava/content",
        branch: "main",
        dir: "content",
      },
    },
    markdown: {
      remarkPlugins: [
        "remark-math",
      ],
      rehypePlugins: {
        "rehype-katex": {
          output: "html",
        },
      },
    },
    highlight: {
      theme: "github-dark",
      preload: [
        "bash",
        "c",
        "cpp",
        "java",
        "julia",
        "python",
        "haskell",
        "hs",
        "f#",
        "vue",
      ],
    },
  },
  ssr: true,

  css: [
    "@/styles/colors.scss",
    "@/styles/default.sass",
    "@/styles/footer.sass",
    "@/styles/geometry.scss",
    "@/styles/mixins.sass",
    "@/styles/palettes.sass",
    "@/styles/raw-fonts.scss",
    "@/styles/theme.sass",
    "@/styles/transitions.sass",
    "@/styles/typography.scss",
  ],
  components: {
    dirs: [
      "@/components/icons",
      "@/components/atoms",
      "@/components/molecules",
      "@/components",
    ],
  },
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    format: ["avif", "webp"],
    provider: "ipx",
    ipx: {},
    dir: "static",
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: process.env.DATABASE_API_KEY,
        authDomain: process.env.DATABASE_AUTH_DOMAIN,
        projectId: process.env.DATABASE_PROJECT_ID,
        storageBucket: process.env.DATABASE_STORAGE_BUCKET,
        messagingSenderId: process.env.DATABASE_MESSAGING_SENDER_ID,
        appId: process.env.DATABASE_APP_ID,
        measurementId: process.env.DATABASE_MEASUREMENT_ID,
      },
    },
  },
})
