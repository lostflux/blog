# Personal Website

Built with [Nuxt 3](https://nuxt.com/v3),
[Sass](https://sass-lang.com), and [TypeScript](https://www.typescriptlang.org),
with a subtle hint of [MongoDB](https://www.mongodb.com).

## Deploy Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/e0f5d7d0-9d2a-45ae-8962-6e3af2ec4cf3/deploy-status)](https://app.netlify.com/sites/amittai/deploys)

&copy; ${2022}^{+}$, Altair[^1]

---

## Tech Stack

| Logo | Name | Description |
| :---: | :---: | :--- |
| ![Nuxt 3](https://nuxt.com/assets/design-kit/logo/icon-green.svg) | [Nuxt 3](https://nuxt.com/v3) | The frontend framework. |
| ![Vue 3](https://vuejs.org/images/logo.svg) | [Vue 3](https://vuejs.org/) | The frontend framework. |
| ![Vite](https://vitejs.dev/logo.svg) | [Vite](https://vitejs.dev) | The build tool. |
| ![TypeScript](https://www.typescriptlang.org/icons/icon-48x48.png?v=8944a05a8d60370dfc5e5e7f9cf64a9b) | [TypeScript](https://www.typescriptlang.org) | The language. |
| ![SCSS/Sass](https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg) | [SCSS/Sass](https://sass-lang.com) | The styling language. |

- [Nuxt 3](https://nuxt.com/v3)
  - [Vue 3](https://vuejs.org/)
    > Components, Composition API, and more!
  - [Vite](https://vitejs.dev)
    > Fast, modern, and efficient build tool.
  - [Nuxt Content](https://content.nuxtjs.org/)
    > Markdown-based content management.
- [TypeScript](https://www.typescriptlang.org)
  > Javascript with types is actually decent.
- [SCSS/Sass](https://sass-lang.com)
  > Just don't use tailwind (what is `w-4 h-4 m-5 p-1-1` supposed to mean? 🤔)
- [Netlify](https://www.netlify.com)
  > Static site hosting.
- [Firebase](https://firebase.google.com)
  > Authentication & user management.

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
npm run build
```

Locally preview production build:

```bash
npm run preview
```

```text
github.com/AlDanial/cloc v 1.94  T=0.35 s (590.1 files/s, 53367.8 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Vuejs Component                107           1015            390           7618
SVG                              8              3              1           2792
Markdown                        54            575              0           2156
SCSS                             4            206            199            992
TypeScript                       9             97            151            728
Text                            10            150              0            611
Sass                             5            175             60            563
JSON                             4              0              0            107
YAML                             4             16             41             61
TOML                             1              1              0             10
XML                              1              0              0              2
-------------------------------------------------------------------------------
SUM:                           207           2238            842          15640
-------------------------------------------------------------------------------
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
