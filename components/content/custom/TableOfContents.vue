<template>
  <div
    v-if="toc && toc.links"
  >
    <ul
      class="toc"
    >
      <span class="title"> Current Page </span>
      <li
        v-for="link in toc.links"
        :key="link.text"
      >
        <a
          :id="`link-${link.id}`"
          :href="`#${link.id}`"
          :class="{
            'toc-link level-1': true,
            'active': activeTocElementIds.includes(link.id) ||
              (link.children &&
                link.children.some(child => activeTocElementIds.includes(child.id)))
          }"
        >
          {{ link.text }}
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
                'active': activeTocElementIds.includes(child.id),
              }"
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
  elementIsAboveScreen,
} from "~/modules/utils";

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
    };
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
  watch: {
    // when route changes, register event listeners in case they haven't been registered yet
    $route() {
      this.refreshKey += 1;
      this.activeTocItems = new Set<Element>();
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleScroll);
    },
  },

  mounted() {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return;
    }
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  },

  unmounted() {
    // ignore in ssr more
    if (typeof window === "undefined") {
      return;
    }
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  },

  methods: {
    updateActiveTocItems() {
      const { tocItemsInViewport } = this;
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
};
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
    font-size: typography.font-size("xl")
    color: colors.color("primary-highlight")
    font-weight: 600
    line-height: 2
    min-width: 100%

  .toc-link
    display: block
    font-weight: 500
    counter-reset: toc-2
    // color: colors.color("dark-foreground")
    position: relative
    border-left: 3px solid

    // -webkit-transition: all 0.1s ease-in-out
    // -moz-transition: all 0.1s ease-in-out
    // -ms-transition: all 0.1s ease-in-out
    // -o-transition: all 0.1s ease-in-out
    // transition: all 0.1s ease-in-out

    &:hover
      border-left: 3px solid colors.color("dark-foreground")
      color: colors.color("primary-highlight") !important

    &.level-1
      padding-left: 1em
      font-size: typography.font-size("s")

      &:hover
        transform: scale(1.02) translateX(2px)

    &.level-2
      padding-left: 2em
      font-size: typography.font-size("xs")

      &:hover
        transform: scale(1.02) translateX(2px)

    &.active
      border-left: 3px solid colors.color("primary-highlight")
      color: colors.color("primary-highlight")

</style>
