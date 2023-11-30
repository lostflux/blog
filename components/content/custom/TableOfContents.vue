<template>
  <div
    v-if="toc && toc.links && toc.links.length > 1"
  >
    <ul
      class="toc"
    >
      <span class="title"> Table of Contents </span>
      <li
        v-for="link in toc.links"
        :key="link.text"
      >
        <a
          :id="`link-${link.id}`"
          :href="`#${link.id}`"
          :class="{
            'toc-link level-1': true,
            'main': activeTocElementIds.includes(link.id),
            'active': activeTocElementIds.includes(link.id) ||
              (link.children &&
                link.children.some(child => activeTocElementIds.includes(child.id)))
          }"
        >
          <span class="link-text"> {{ link.text }} </span>
        </a>
        <ul v-if="link.children">
          <li
            v-for="child in link.children"
            :key="child.text"
          >
            <a
              :id="`link-${child.id}`"
              :href="`#${child.id}`"
              :class="{
                'toc-link level-2': true,
                'main': activeTocElementIds.includes(child.id),
                'active': activeTocElementIds.includes(child.id),
              }"
            >
              <span class="link-text"> {{ child.text }} </span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: "TableOfContents",
  props: {
    activeTocItem: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      refreshKey: 0,
      scrollY: 0,
      scrollDirection: "down",
      activeTocItems: new Set<Element>(),
    }
  },
  computed: {
    activeTocElementIds(): string[] {
      const tocItemIds: string[] = []
      this.activeTocItems.forEach((tocItem: Element) => {
        tocItemIds.push(tocItem.id)
      })
      return tocItemIds
    },

    tocItemsOrdered() {
      // eslint-disable-next-line no-unused-expressions
      this.refreshKey
      return Array.from(document.querySelectorAll("h2, h3"))
    },

    tocItemsInViewport(): Element[] {
      // eslint-disable-next-line no-unused-expressions
      this.refreshKey

      if (typeof window === "undefined") {
        return []
      }

      const tocItemsInViewport: Element[] = []

      this.tocItemsOrdered.forEach((tocItem: Element) => {
        if (elementIsInWindow(tocItem)) {
          tocItemsInViewport.push(tocItem)
        }
      })
      return tocItemsInViewport
    },
  },
  watch: {
    // when route changes, register event listeners in case they haven't been registered yet
    $route() {
      this.refreshKey += 1
      this.activeTocItems = new Set<Element>()
      this.handleScroll()
      window.addEventListener("scroll", this.handleScroll)
      window.addEventListener("resize", this.handleScroll)
    },
  },

  mounted() {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return
    }
    this.handleScroll()
    window.addEventListener("scroll", this.handleScroll)
    window.addEventListener("resize", this.handleScroll)
  },

  unmounted() {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return
    }
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleScroll)
  },

  methods: {
    updateActiveTocItems() {
      const { tocItemsInViewport } = this
      this.tocItemsOrdered.forEach((tocItem: Element) => {
        const elemIndex = this.tocItemsOrdered.indexOf(tocItem)
        if (tocItemsInViewport.includes(tocItem)) {
          this.activeTocItems.add(tocItem)

          // if element not at top of screen, add predecessor
          if (!elementIsAtTop(tocItem)) {
            const predecessor = this.tocItemsOrdered[elemIndex - 1] || null
            if (predecessor) {
              this.activeTocItems.add(predecessor)
            }
          }
        } else if (elementIsBelowScreen(tocItem)) {
          this.activeTocItems.delete(tocItem)
        } else if (elementIsAboveScreen(tocItem)) {
          const successor = this.tocItemsOrdered[elemIndex + 1] || null
          if (successor && elementIsAboveScreen(successor)) {
            this.activeTocItems.delete(tocItem)
          }
        }
      })
    },
    handleScroll() {
      this.refreshKey = this.refreshKey === 999 ? 0 : this.refreshKey + 1

      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
      this.scrollDirection = currentScrollPosition > this.scrollY
        ? "down"
        : "up"
      this.scrollY = currentScrollPosition

      this.updateActiveTocItems()
    },
  },
}
</script>

<script lang="ts" setup>
import { withoutTrailingSlash } from "ufo"

const path = withoutTrailingSlash(useRoute().path)
const { data: page } = await useAsyncData(async () => {
  const _page = await queryContent().where({ _path: path }).findOne()
  return _page
})

const toc = page?.value?.body?.toc

</script>

<style lang="sass" scoped>
@use "../styles/typography"
@use "../styles/colors"
@use "@/styles/geometry"
.toc
  line-height: 2
  position: relative
  max-width: 100%

  .title
    text-transform: uppercase
    font-size: typography.font-size(xs)
    font-weight: 600
    color: colors.color(foreground)

  .toc-link
    display: block
    font-weight: 500
    border-left: 1px solid transparent
    width: 100%
    overflow: hidden
    text-overflow: ellipsis
    font-weight: 600
    color: colors.color(dark-foreground)

    .link-text
      transition: geometry.var("default-transition")
      white-space: nowrap
      overflow: hidden

    &:hover
      color: colors.color(lightest-foreground) !important

      & > .link-text
        margin-left: -5px

    &.level-1
      padding-left: 1em
      font-size: typography.font-size("xs")

    &.level-2
      padding-left: 2em
      font-size: typography.font-size("xs")

    &.active
      color: colors.color(lightest-foreground)
      font-weight: 600

      &.main
        border-left: 1px solid colors.color(lightest-foreground)

</style>
