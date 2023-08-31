<template>
  <header
    ref="headerRef"
    :class="{
      'header': true,
      'collapse-into-page': scrolledToTop}"
    :style="style"
  >
    <nav class="header-nav">
      <!-- <Logo class="header-logo" /> -->
      <!-- <SearchBar
        ref="searchBar"
        class="search-bar"
      /> -->
      <!-- <StyledMenuButton
        ref="buttonRef"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
        class="menu-button"
        @click="toggleMenu"
      /> -->
    </nav>
    <div
      :class="{
        'site-menu': true,
        'menu-open': menuOpen,
      }"
    >
      <div class="menu-columns-wrapper">
        <div
          v-if="showToc && (toc && toc.links && toc.links.length > 0)"
          class="menu-column toc-current-page"
        >
          <NuxtLink
            :to="currentPage"
            class="menu-column-header"
          >
            <strong> Current Page </strong>
          </NuxtLink>
          <ul v-if="currentPage === '/'">
            <li
              v-for="(anchor, i) in navLinks.homeLinks"
              :key="i"
            >
              <NuxtLink
                :to="anchor._path"
                class="menu-column-item"
              >
                {{ anchor.title }}
              </NuxtLink>
            </li>
          </ul>
          <TableOfContents
            v-else
            class="toc-current-page"
          />
        </div>
        <div class="menu-column">
          <NuxtLink
            to="/moments"
            class="menu-column-header"
          >
            <strong> Featured </strong>
          </NuxtLink>
          <ul>
            <li>
              <NuxtLink
                to="/moments"
                class="menu-column-item"
              >
                <strong>moments</strong>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/aphorisms"
                class="menu-column-item"
              >
                <strong>aphorisms</strong>
              </NuxtLink>
            </li>
            <li
              v-for="(item, i) in featuredBlogs"
              :key="i"
            >
              <NuxtLink
                :to="item._path"
                class="menu-column-item"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="menu-column">
          <NuxtLink
            to="/writing"
            class="menu-column-header"
          >
            <strong> Latest </strong>
          </NuxtLink>
          <ul>
            <li
              v-for="(item, i) in latestBlogs"
              :key="i"
            >
              <NuxtLink
                :to="item._path"
                class="menu-column-item"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="menu-column">
          <NuxtLink
            to="/"
            class="menu-column-header"
          >
            <strong> Apps </strong>
          </NuxtLink>
          <ul>
            <li
              v-for="(item, i) in apps"
              :key="i"
            >
              <NuxtLink
                :to="item._path"
                class="menu-column-item"
                style="text-transform: capitalize;"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu-extras">
        <div class="menu-extras-footer">
          <AppFooter
            class="menu-footer in-header"
            identifier="in-header"
          />
        </div>
      </div>
    </div>
    <div
      v-if="toc && toc.links && toc.links.length > 0"
      v-show="showToc()"
      class="header-toc-plus-button"
    >
      <div class="toc-wrapper">
        <button
          :class="{
            'header-toc-button': true,
            'expanded': tocExpanded,
          }"
          @click="tocExpanded = !tocExpanded"
        >
          <span> Table of Contents</span>
          <Icon
            :class="{
              'expand-icon': true,
              'expanded': tocExpanded
            }"
            type="expand"
          />
        </button>
        <div
          :class="{
            'header-toc': true,
            'header-toc-hidden': (!tocExpanded) || menuOpen,
          }"
        >
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
const {
  navHeight, navLinks, showToc,
} = useConfig();

export default {
  name: "AppHeader",
  data() {
    return {
      scrollSpeed: 1,
      lastScrollPosition: 0,
      scrollHeight: 0,
      height: 0,
      menuOpen: false,
      anchors: [],
      tocExpanded: false,
    };
  },
  computed: {
    hidden() {
      return this.scrollHeight === this.height;
    },
    revealed() {
      return this.scrollHeight === 0;
    },
    style() {
      return this.scrolledToTop
        ? "box-shadow: none; background-color: none;"
        : `transform: translateY(-${this.scrollHeight}px)`;
    },
    scrolledToTop() {
      return this.lastScrollPosition <= 0;
    },
    route() {
      const { path } = useTrimmedPath();
      return path;
    },
  },
  watch: {
    menuOpen: {
      handler() {
        this.height = this.$el.offsetHeight || 0;
      },
      deep: true,
    },
    anchors() {
      // this.$forceUpdate();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // set height initially.
    this.height = navHeight; // this.$el.offsetHeight;

    this.setup();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.height = this.$refs.header.offsetHeight || 0;
    },
    close() {
      this.menuOpen = false;
    },

    setup() {
      const { path } = useTrimmedPath();
      if (path === "/") {
        this.anchors = navLinks.homeLinks;
      }

      this.$forceUpdate();
    },

    /**
     * Handle scroll event.
     *
     * NOTE: `scroll position` increases as you go down the page.
     */
    handleScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

      // we want positive offset if scrolling down, negative if scrolling up
      const offset = this.scrollSpeed * (currentScrollPosition - this.lastScrollPosition);
      this.lastScrollPosition = currentScrollPosition;

      if (offset > 0 && !this.hidden && !this.menuOpen) {
        this.scrollHeight = Math.min(this.scrollHeight + offset, this.height);
        if (this.scrollHeight >= this.height) {
          this.scrollHeight = this.height;
        }
      } else if (offset < 0 && !this.revealed) {
        this.scrollHeight = Math.max(0, this.scrollHeight + offset);
      }
    },
  },
};
</script>

<script lang="ts" setup>

const { path: currentPage } = useTrimmedPath();
const { toc } = useContent();

const menuOpen = ref(false);
const buttonRef = ref(null);
const headerRef = ref(null);
const searchBar = ref(null);

const closeMenu = () => {
  menuOpen.value = false;
};

const openMenu = () => {
  menuOpen.value = true;
  // auto-focus on search bar on desktop
  if (window.innerWidth > 768) {
    // setTimeout(() => {
    //   document.getElementById("searchbar")?.focus();
    // }, 2000);
  }
};

const toggleMenu = () => {
  buttonRef.value.toggle();
  headerRef.value.menuOpen = !headerRef.value.menuOpen;
  if (headerRef.value.menuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
};

/// DATA
const { data: featuredBlogs } = await useAsyncData(
  // "featured-blogs-meta",
  async () => {
    const _blogs = await queryContent()
      .where({ draft: false })
      .where({ category: { $contains: "featured" } })
      .where({ category: { $not: { $containsAny: ["moments", "aphorisms"] } } })
      .limit(10)
      .only(["_path", "title", "date", "description"])
      .sort({ date: -1 })
      .find();
    return _blogs;
  },
);

/// PUBLICATIONS
const { data: latestBlogs } = await useAsyncData(
  // "publication-blogs-meta",
  async () => {
    const _blogs = await queryContent()
      .where({ draft: false })
      .where({ category: { $not: { $containsAny: ["moments", "aphorisms"] } } })
      .only(["_path", "title", "date", "description"])
      .sort({ date: -1 })
      .limit(10)
      .find();
    return _blogs;
  },
);

const { apps } = useApps();
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"
@use "~/styles/transitions"

.header
  @include mixins.flex-between

  z-index: 11
  position: sticky
  top: 0
  left: 0
  width: 100%
  display: table
  padding: 0

  // trick: make header stick out a bit
  // by filtering it with grayscale.
  // filter: grayscale(30%) !important

  // blur when there's content underneath
  // background-color: colors.color("background")
  background-color: rgba(colors.color("background"), 0.8)
  backdrop-filter: blur(2px)
  //background-color: red

  pointer-events: auto !important
  user-select: auto !important
  transition: geometry.var("default-transition")

  @media (prefers-reduced-motion: no-preference)
    box-shadow: 0 10px 30px -10px colors.color("shadow")

  max-height: 90vh
  overflow-y: scroll

  -webkit-transition: all 0.1s ease-in-out
  -ms-transition: all 0.1s ease-in-out
  -moz-transition: all 0.1s ease-in-out
  -o-transition: all 0.1s ease-in-out
  transition: all 0.1s ease-in-out

  //&.collapse-into-page
  //  border-bottom: 1px solid colors.color(lightest-background)

  .footer-link
    background: none !important
    border: 2px solid colors.color("light-background") !important

    &:hover
      background: colors.color("light-background") !important

.header-nav
  @include mixins.flex-between
  position: relative
  color: colors.color("light-foreground")
  font-family: typography.font("monospace")
  counter-reset: item
  margin: 0 auto
  height: geometry.var("header-height")
  max-height: geometry.var("header-height")
  width: min(100%, 1300px)

.site-menu
  display: block
  position: relative
  max-width: 1300px
  width: 100%
  margin: 0 auto
  overflow-y: scroll
  color: colors.color("light-foreground")
  font-weight: 500
  line-height: 2
  max-height: 0

  &.menu-open
    max-height: 80vh

  -webkit-transition: all 0.1s ease-in-out
  -ms-transition: all 0.1s ease-in-out
  -moz-transition: all 0.1s ease-in-out
  -o-transition: all 0.1s ease-in-out
  transition: all 0.1s ease-in-out

.search-bar
  align-content: center
  vertical-align: middle
  height: geometry.var("nav-height")
  width: 100%

.header-toc-plus-button
  position: relative
  //padding: 10px 0
  //margin: 0 auto
  //border-bottom: 2px dotted colors.color("lightest-background")
  font-size: typography.font-size(m)
  margin: 0
  margin-left: 1em

  .toc-wrapper
    width: fit-content //100%
    max-width: 70ch
    padding: 10px 1em
    border-left: 1px solid colors.color(light-background)
    margin: 0

  .header-toc-button
    width: 100%
    height: 20px
    display: flex
    flex-direction: row
    white-space: nowrap
    align-items: flex-start

    text-transform: uppercase
    font-size: typography.font-size(xs)
    font-weight: 500
    display: flex
    place-items: center
    gap: 10px

    margin-top: 0
    padding-top: 0
    line-height: 1.5

    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    -o-user-select: none
    user-select: none

    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-tap-highlight-color: transparent

  .header-toc
    padding-top: 10px
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    -o-user-select: none
    user-select: none

    -webkit-transition: all 0.1s ease-in-out
    -ms-transition: all 0.1s ease-in-out
    -moz-transition: all 0.1s ease-in-out
    -o-transition: all 0.1s ease-in-out
    transition: all 0.1s ease-in-out

    overflow: hidden
    max-height: 100%

    * > .toc > .title
      display: none !important

    &.header-toc-hidden
      max-height: 0
      padding-top: 0

// hide toc on desktop
@media (min-width: 1150px)

  .header-toc-plus-button
    display: none

.toc-current-page

  * > .toc > .title
    display: none

  .toc-link-1
    color: colors.color("lightest-foreground") !important
    font-family: typography.font("sans-serif") !important
    font-size: typography.font-size("m") !important

    font-weight: 400 !important
    line-height: 2.5em !important

    &::before
      content: none !important

  * > .toc .toc-link-2
    display: none

</style>
