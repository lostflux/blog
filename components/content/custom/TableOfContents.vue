<template>
  <div
    v-if="toc && toc.links"
  >
    <ul
      class="toc"
    >
      <span class="title"> On this page </span>
      <li
        v-for="link in toc.links"
        :key="link.text"
        :class="{
          'toc-link-1': true,
          'active': activeTocElementIds.includes(link.id) ||
            (link.children &&
              link.children.some(child => activeTocElementIds.includes(child.id)))
        }"
      >
        <a
          :href="`#${link.id}`"
          :id="`link-${link.id}`"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children">
          <li
            v-for="child in link.children"
            :key="child.text"
            :class="{
              'toc-link-2': true,
              'active': activeTocElementIds.includes(child.id),
            }"
          >
            <a
              :href="`#${child.id}`"
              :id="`link-${child.id}`"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { 
  elementIsInWindow,
  elementIsAtBottom,
  elementIsAtTop,
  elementIsBelowScreen,
  elementIsAboveScreen
} from "~/src/utils";

export default {
  name: "TableOfContents",
  props: {
    activeTocItem: {
      type: String,
      default: ""
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
      const tocItemIds: string[] = [];
      this.activeTocItems.forEach((tocItem: Element) => {
        tocItemIds.push(tocItem.id);
      });
      return tocItemIds;
    },

    tocItemsOrdered() {
      this.refreshKey;
      return Array.from(document.querySelectorAll("h2, h3"));
    },

    tocItemsInViewport(): Element[] {

      this.refreshKey;

      // ignore in ssr more
      if (typeof window === "undefined") {
        return [];
      }
      
      const tocItemsInViewport: Element[] = [];

      this.tocItemsOrdered.forEach((tocItem: Element) => {
        if (elementIsInWindow(tocItem)) {
          tocItemsInViewport.push(tocItem);
        }
      });
      return tocItemsInViewport;
    },
  },

  methods: {
    updateActiveTocItems() {
      const tocItemsInViewport = this.tocItemsInViewport;
      this.tocItemsOrdered.forEach((tocItem: Element) => {
      const elemIndex = this.tocItemsOrdered.indexOf(tocItem);
        if (tocItemsInViewport.includes(tocItem)) {
          this.activeTocItems.add(tocItem);

          // if element not at top of screen, add predecessor
          if (!elementIsAtTop(tocItem)) {
            const predecessor = this.tocItemsOrdered[elemIndex - 1] || null;
            if (predecessor) {
              this.activeTocItems.add(predecessor);
            }
          }

        } else if (elementIsBelowScreen(tocItem)) {
          this.activeTocItems.delete(tocItem);
        } else if (elementIsAboveScreen(tocItem)) {
          const successor = this.tocItemsOrdered[elemIndex + 1] || null;
          if (successor && elementIsAboveScreen(successor)) {
            this.activeTocItems.delete(tocItem);
          }
        }
      });
    },
    handleScroll() {

      this.refreshKey = this.refreshKey == 999 ? 0 : this.refreshKey + 1;

      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.scrollDirection = (currentScrollPosition > this.scrollY)
        ? "down"
        : "up";
      this.scrollY = currentScrollPosition;

      this.updateActiveTocItems();
    },
  },


  mounted: function () {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return;
    }
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  },


  unmounted: function () {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return;
    }
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  },
  watch: {
    // when route changes, register event listeners in case they haven't been registered yet
    $route() {
      this.refreshKey += 1;
      this.activeTocItems = new Set<Element>();
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleScroll);
    },
  }
}
</script>

<script lang="ts" setup>
const { path } = useRoute();
const { toc } = useContent();



</script>

<style lang="sass" scoped>
@use "../styles/typography"
@use "../styles/colors"
@use "~/styles/geometry"
.toc
  line-height: 2
  counter-reset: toc-1
  position: relative

  .title
    color: colors.color("primary-highlight")
    font-weight: 800
    line-height: 2
    min-width: 100%

    text-transform: uppercase
    font-size: typography.font-size("l")
    font-family: typography.font("headings")

  .toc-link-1
    // margin-left: 1em
    font-size: typography.font-size("s")
    // font-size: 1
    font-weight: 500
    counter-reset: toc-2
    // color: colors.color("lightest-foreground")
    color: colors.color("fancy-background")

    -webkit-transition: all 0.1s ease-in-out
    -moz-transition: all 0.1s ease-in-out
    -ms-transition: all 0.1s ease-in-out
    -o-transition: all 0.1s ease-in-out
    transition: all 0.1s ease-in-out
    
    &::before
      counter-increment: toc-1
      content: counter(toc-1) "."
      margin-right: 0.5em
      color: colors.color("primary-highlight")

    &.active
      color: colors.color("primary-highlight")
.toc-link-2
  margin-left: 1em
  font-size: typography.font-size("xs")
  font-weight: 400
  line-height: 2
  color: colors.color("fancy-background")

  -webkit-transition: all 0.1s ease-in-out
  -moz-transition: all 0.1s ease-in-out
  -ms-transition: all 0.1s ease-in-out
  -o-transition: all 0.1s ease-in-out
  transition: all 0.1s ease-in-out

  &::before
    counter-increment: toc-2
    content: counter(toc-1) "." counter(toc-2) "."
    margin-right: 0.5em
    color: colors.color("primary-highlight")

  &.active
    color: colors.color("primary-highlight")
</style>

