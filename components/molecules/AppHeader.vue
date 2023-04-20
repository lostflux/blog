<template>
  <header
    ref="headerRef"
    :class="{
      'header': true,
      'collapse-into-page': scrolledToTop}"
    :style="style"
  >
    <nav class="header-nav">
      <Logo class="header-logo" />
      <NavLinks class="header-nav-links" />
      <StyledMenuButton
        ref="buttonRef"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
        class="menu-button"
        @click="toggleMenu"
      />
    </nav>
    <div
      :class="{
        'site-menu': true,
        'menu-open': menuOpen,
      }"
    >
      <SearchBar
        ref="searchBar"
        class="search-bar"
      />
      <div class="menu-columns-wrapper">
        <div
          v-if="currentPage === '/' || (toc && toc.links && toc.links.length > 0)"
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
            to="/blog"
            class="menu-column-header"
          >
            <strong> Featured </strong>
          </NuxtLink>
          <ul>
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
            to="/blog"
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
          <div>
            happening soon.
          </div>
        </div>
      </div>
      <div class="menu-extras">
        <div class="menu-extras-footer">
          <AppFooter class="menu-footer in-header" />
        </div>
      </div>
    </div>
    <div
      v-if="currentPage === '/' || (toc && toc.links && toc.links.length > 0)"
      v-show="nonTocRoutes.indexOf(route) === -1"
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
          <span style="margin-right: 0.5em;"> Table of Contents</span>
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
import { navHeight, nonTocRoutes, navLinks } from "~/modules/config";
import { loaderDelay as timeout } from "~/modules/utils";

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
      return useRoute().path;
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
      const { path } = useRoute();
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
// import { UserInfo } from "~/modules/users";

// const userInfo = useUserInfo();

const { path: currentPage } = useRoute();
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
    setTimeout(() => {
      document.getElementById("searchbar")?.focus();
    }, timeout);
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
  "featured-blogs-meta",
  async () => {
    const _blogs = queryContent("blog/posts")
      .where({ draft: false })
      .where({ category: { $contains: "featured" } })
      .only(["_path", "title", "date", "description"])
      .limit(7)
      .sort({ date: -1 })
      .find();
    return _blogs;
  },
);

/// PUBLICATIONS
const { data: latestBlogs } = await useAsyncData(
  "publication-blogs-meta",
  async () => {
    const _blogs = queryContent("blog/posts")
      .where({ draft: false })
      .only(["_path", "title", "date", "description", "tags"])
      .limit(7)
      .sort({ date: -1 })
      .find();
    return _blogs;
  },
);

/// RESEARCH
// const { data: researchMeta } = await useAsyncData(
//   "research-blogs-meta",
//   async () => {
//     const _blogs = queryContent("blog/posts")
//       .where({ draft: false })

//       // select blogs that have publications as one of the categories
//       .where({ category: { $contains: "research" } })
//       .only(["_path", "title", "date", "description", "tags"])
//       .limit(5)
//       .sort({ date: -1 })
//       .find();
//     return _blogs;
//   },
// );
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
  min-height: 70px
  max-height: 90vh
  display: table
  padding: 0 clamp(10px, 2vw, 20px)

  // trick: make header stick out a bit
  // by filtering it with grayscale.
  // filter: grayscale(30%) !important

  // blur when there's content underneath
  // background-color: colors.color("background")
  background-color: rgba(colors.color("background"), 0.8)
  backdrop-filter: blur(2px)

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

  // &.collapse-into-page
  //   border-bottom: 1px solid colors.color(lightest-background)

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

  .header-logo
    position: relative
    align-self: left
    height: 70px
    aspect-ratio: 1 / 1
    margin-left: 0
    padding: 20px 30px 20px 10px

  .header-nav-links
    position: relative
    height: 70px
    padding: 10px

  .menu-button
    position: relative
    height: 70px
    aspect-ratio: 1 / 1
    margin: auto 0
    padding: 15px 0px 15px 5px

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

  &::-webkit-scrollbar
    display: none

.menu-columns-wrapper
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-between
  height: 100%
  width: 100%
  margin: 0 0 40px 0
  color: inherit

.menu-column
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 100%
  width: 25%
  padding-left: 10px
  margin-top: 40px

  @media (max-width: 1080px)
    width: 50%
    flex: 0 50%

  @media (max-width: 768px)
    width: 100%
    flex: 0 100%

.menu-column-header
  font-family: typography.font("sans-serif")
  font-size: typography.font-size("xl")
  color: colors.color("light-foreground")

.menu-column-item
  font-family: typography.font("sans-serif")
  font-size: typography.font-size("m")
  color: colors.color("light-foreground")

.menu-extras
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 100%
  width: 100%
  border-top: 1px solid colors.color("light-background")

.menu-extras-footer
  width: 100%

  .menu-footer
    // float: right
    margin-top: 20px
    // top: 0px
    width: 100%
    margin: 0 auto

    &.in-header
      border-top: none

      .styled-button
        background: transparent !important
        border: 2px solid colors.color("lightest-background") !important

        &:hover
          background: colors.color("lightest-background") !important
          border: 2px solid transparent

.search-bar
  border-top: 3px dotted colors.color("lightest-background")
  border-bottom: 3px dotted colors.color("lightest-background")
  padding: 0 2vw
  align-content: center
  vertical-align: middle
  height: geometry.var("nav-height")

.header-toc-plus-button
  position: relative
  padding: 10px 0
  margin: 0 auto
  min-height: 40px
  border-top: 3px dotted colors.color("lightest-background")
  border-bottom: 3px dotted colors.color("lightest-background")
  // background: none
  // backdrop-filter: blur(2px) !important

  .toc-wrapper
    width: 100%
    max-width: 70ch
    margin: 0 auto
    padding: 0 1em

  .header-toc-button
    width: 100%
    height: 20px
    display: flex
    flex-direction: row
    white-space: nowrap
    align-items: flex-start
    font-size: typography.font-size("m")
    color: colors.color('foreground')
    font-weight: 500

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

    &.expanded
      color: colors.color('primary-highlight')

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

    overflow: hidden //: none
    max-height: 100%

    * > .toc > .title
      display: none !important

    &.header-toc-hidden
      max-height: 0
      padding-top: 0

// hide toc on desktop
@media (min-width: 1200px)

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

.user-info
  display: flex
  justify-content: center
  align-items: center
  margin: auto 0
  padding: 0 2vw
  .user-header
    display: flex
    flex-direction: row
    align-items: center
    margin-bottom: 10px

    .user-avatar
      width: 40px
      height: 40px
      border-radius: 50%
      margin-right: 10px
      margin-top: 10px
      margin-bottom: 10px
      background-size: cover
      background-position: center
      background-repeat: no-repeat

    .user-header-text
      display: flex
      flex-direction: column
      justify-content: center
      background: yellow
      line-height: 1.5

      .user-name
        font-family: typography.font("sans-serif")
        font-size: typography.font-size("m")
        color: colors.color("lightest-foreground")
        font-weight: 500

      .user-email
        font-family: typography.font("sans-serif")
        font-size: typography.font-size("m")
        color: colors.color("light-foreground")
        font-weight: 400

</style>
