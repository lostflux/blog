<template>
  <header
    ref="headerRef"
    :key="tocKey"
    :class="{
      'header': true,
      'collapse-into-page': scrolledToTop,
      'hidden': !showToc
    }"
    :style="style"
  >
    <div
      class="header-toc-plus-button"
    >
      <!-- v-show="toc && toc?.links?.length > 1" -->
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
  navHeight,
} = useConfig()

// get current route path
// const { path } = useRoute()

export default {
  name: "AppHeader",
  data() {
    return {
      scrollSpeed: 1,
      lastScrollPosition: 0,
      scrollHeight: 0,
      height: 0,
      menuOpen: false,
      tocExpanded: false,
      tocKey: 0,
    }
  },
  computed: {
    hidden() {
      return this.scrollHeight === this.height
    },
    revealed() {
      return this.scrollHeight === 0
    },
    style() {
      return this.scrolledToTop
        ? "box-shadow: none; background-color: none;"
        : `transform: translateY(-${this.scrollHeight}px)`
    },
    scrolledToTop() {
      return this.lastScrollPosition <= 0
    },
    route() {
      const { path } = useTrimmedPath()
      return path
    },
  },
  watch: {
    menuOpen: {
      handler() {
        this.height = this.$el.offsetHeight || 0
      },
      deep: true,
    },
    $route(to, from) {
      console.log("route changed", to, from)
      // this.tocExpanded = false

      // force update on next tick
      this.$nextTick(() => {
        this.$forceUpdate()
      })
      // this.$forceUpdate()
      this.tocKey += 1
      this.$forceUpdate()
      console.log("tocKey", this.tocKey)
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)

    // set height initially.
    this.height = navHeight
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    toggleMenu() {
      // @ts-ignore
      this.height = this.$refs.header.offsetHeight || 0
    },
    close() {
      this.menuOpen = false
    },

    /**
     * Handle scroll event.
     *
     * NOTE: `scroll position` increases as you go down the page.
     */
    handleScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop

      // we want positive offset if scrolling down, negative if scrolling up
      const offset = this.scrollSpeed * (currentScrollPosition - this.lastScrollPosition)
      this.lastScrollPosition = currentScrollPosition

      if (offset > 0 && !this.hidden && !this.menuOpen) {
        this.scrollHeight = Math.min(this.scrollHeight + offset, this.height)
        if (this.scrollHeight >= this.height) {
          this.scrollHeight = this.height
        }
      } else if (offset < 0 && !this.revealed) {
        this.scrollHeight = Math.max(0, this.scrollHeight + offset)
      }
    },
  },
}
</script>

<script lang="ts" setup>
const { path } = useRoute()
const { data: page } = await useAsyncData(
  `toc-data-${path}`,
  async () => {
    const _page = await queryContent().where({ _path: path }).findOne()
    return _page
  },
)

// get toc for current page

const toc = page?.value?.body?.toc

const showToc = computed(() => toc && toc?.links?.length > 1)

const menuOpen = ref(false)

const headerRef = ref(null)
</script>

<style lang="sass">
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"
@use "@/styles/mixins"
@use "@/styles/transitions"

.header
  @include mixins.flex-between

  z-index: 11
  position: sticky
  top: 0
  left: 0
  width: 100%
  display: table
  padding: 0
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

  &.hidden
    // display: none
    // width: 0
    height: 0
    overflow: hidden

    *
      display: none
    // background: yellow

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
    color: colors.color(lightest-foreground)
    user-select: none

    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-tap-highlight-color: transparent

    &:hover
      cursor: pointer

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
    font-family: typography.font("sans-serif"), sans-serif !important
    font-size: typography.font-size("m") !important

    font-weight: 400 !important
    line-height: 2.5em !important

    &::before
      content: none !important

  * > .toc .toc-link-2
    display: none

</style>
