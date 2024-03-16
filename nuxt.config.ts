import { resolve } from "path"

const contentSource: any = {}

const localSource = process.env.CONTENT_SOURCE || undefined

if (localSource) {
  contentSource.driver = "fs"
  contentSource.base = resolve(__dirname, localSource, "content")
} else {
  contentSource.driver = "github"
  contentSource.repo = "siavava/content"
  contentSource.branch = "main"
  contentSource.dir = "content"
}

// console.info(`local source: ${localSource}`)
console.info(`contentSource: ${JSON.stringify(contentSource)}`)

export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },
  routeRules: {
    "/**": {
      // isr: 60,
      ssr: true,
    },
  },
  app: {
    head: {
      title: "alt",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0A0A0A" },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "amittai" },
        { property: "og:locale", content: "en_US" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "icon", type: "image/svg", href: "/favicon.svg" },
        {
          rel: "mask-icon",
          type: "image/svg",
          href: "/favicon.svg",
          color: "#f42e4f",
        },
        {
          rel: "apple-touch-icon",
          type: "image/svg",
          href: "/favicon.svg",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
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
    "@nuxt/devtools",
    "@nuxt/image",
    // "nuxt-pageviews",
    "nuxt-gtag",
    "@pinia/nuxt",
    [
      "@nuxtjs/algolia",
      {
        applicationId: process.env.ALGOLIA_SEARCH_APP_ID,
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      },
    ],
    [
      "@nuxtjs/robots",
      {
        Comment: "Algolia-Crawler-Verif: 126E843A3C9C54DF",
        UserAgent: "*",
        Disallow: "",
        Sitemap: "https://amittai.space/sitemap.xml",
      },
    ],
  ],
  router: {},
  devtools: {
    enabled: true,
    vscode: {},
  },
  content: {
    sources: {
      blog: contentSource,
    },
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: {
        "rehype-katex": {
          output: "html",
          errorColor: "#BD998F",
          globalGroup: true,
          macros: {
            "\\RR": "\\mathbb{R}",
            "\\NN": "\\mathbb{N}",
            "\\ZZ": "\\mathbb{Z}",
            "\\QQ": "\\mathbb{Q}",
            "\\CC": "\\mathbb{C}",
            "\\FF": "\\mathbb{F}",
            "\\PP": "\\mathbb{P}",
            "\\d": "\\mathrm{d}",
            "\\Re": "\\operatorname{Re}",
            "\\cos": "\\operatorname{cos}",
            "\\sin": "\\operatorname{sin}",

            // parentheses
            "\\parens": "\\left( #1 \\right)",
            "\\braces": "\\left\\{ #1 \\right\\}",
            "\\brackets": "\\left[ #1 \\right]",
          },
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
    provider: "ipxStatic",

    // provider: "cloudinary",
    // cloudinary: {
    //   // baseURL: process.env.CLOUDINARY_BASE_URL,
    //   baseURL: "https://res.cloudinary.com/ddxpqn2jg/image/upload",
    // },
  },
  gtag: {
    id: "G-1GPPT1CS3Z",
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

  hooks: {
    close: () => {
      process.exit(0)
    },
  },
})
