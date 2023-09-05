# Personal Website

Built with [Nuxt 3](https://nuxt.com/v3),
[Sass](https://sass-lang.com), and [TypeScript](https://www.typescriptlang.org),
with a subtle hint of [MongoDB](https://www.mongodb.com).

## Deploy Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/e0f5d7d0-9d2a-45ae-8962-6e3af2ec4cf3/deploy-status)](https://app.netlify.com/sites/amittai/deploys)

&copy; ${2022}^{+}$, Amittai[^1]

---

## Tech Stack

| Name | Description |
| :--- | ---: |
| [Nuxt 3](https://nuxt.com/v3) | Vue framework |
| [Vue 3](https://vuejs.org/) | Frontend framework |
| [Vite](https://vitejs.dev) | Build tool |
| [Nuxt Content](https://content.nuxtjs.org/) | Markdown-based content management |
| [TypeScript](https://www.typescriptlang.org) | Javascript with types |
| [SCSS/Sass](https://sass-lang.com) | CSS preprocessor |
| [Netlify](https://www.netlify.com) | Static site hosting |
| [Firebase](https://firebase.google.com) | auth and data store |

---

## Nuxt 3 Documentation

Look at the [Nuxt 3 info page](https://v3.nuxtjs.org) to learn more:

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
# build SSR server
npm run build

# build static site
npm run generate  # note: this will run `build` as well
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [Nuxt3 docs](https://nuxt.com/docs)
and [Nuxt2 docs](https://nuxtjs.org/docs/) for more information.[^2]

[^1]: Can you fully reuse this website? That is certainly not my
      intention, but if you are learning Nuxt, Vue,
      or Web Development in general,
      feel free to use this as a starting point.
      Likewise, some of the designs are inspired by
      things I saw on the internet, but I redesigned myself.

[^2]: Nuxt 2 docs offer better examples and and interactive guides,
      but obviously are not up to date with everything new Nuxt 3
      (but, generally, much of Nuxt 2 is still present in Nuxt 3
      so there's useful stuff to be got there).
