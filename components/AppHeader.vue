<template>
  <header
    ref="header"
    class="header"
    :style="style"
  >
    <Nav class="nav" />
  </header>
</template>


<script lang="ts">

const header = ref<HTMLElement | null>(null);
export default {
  name: "AppHeader",
  data() {
    return {
      scrollSpeed: 0.4,
      lastScrollPosition: 0,
      scrollHeight: 0,
      height: 0
    };
  },
  computed: {
    hidden() {
      return this.scrollHeight == this.height;
    },
    revealed() {
      return this.scrollHeight == 0;
    },
    style() {
      return `transform: translateY(-${this.scrollHeight}px)`;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    
    // set height initially.
    this.height = this.$refs.header.offsetHeight || 0;

    // update height on resize!
    window.addEventListener("resize", () => {
      this.height = this.$refs.header.offsetHeight || 0;
      // console.log(`Resized! Height = ${this.height}`);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {

    /**
     * Handle scroll event.
     * 
     * NOTE: `scroll position` increases as you go down the page.
     */
    handleScroll() {

      /*
        We track: 
          - the height of the header
          - the last scroll position of the window
          - the current scroll height of the header: 0 <= scroll height <= height
            - 0 = header is fully visible
            - height = header is fully hidden
          - the hidden status of the header
            
          
        On scrolling down (going to hide header):
          - if header hidden, do nothing

          - if header not hidden:
            - find offset from last scroll position to current scroll position
            - add offset to scroll height
            - if scroll height >= height,
              set scroll height to height
              and set header hidden to true
              

        On scrolling up:
          - if header hidden, set to not hidden
          - if scroll height == 0, do nothing
          
          - if scroll height > 0:
            - find offset from last scroll position to current scroll position
            - add offset from scroll height
            - if scroll height <= 0,
              set scroll height to 0
      */


      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

      // we want positive offset if scrolling down, negative if scrolling up
      const offset = this.scrollSpeed  * (currentScrollPosition - this.lastScrollPosition);
      this.lastScrollPosition = currentScrollPosition;

      if (offset > 0 && !this.hidden) {
        // scrolling down
        this.scrollHeight = Math.min(this.scrollHeight + offset, this.height);
        if (this.scrollHeight >= this.height) {
          this.scrollHeight = this.height;
        }
      }
      else if (offset < 0 && !this.revealed){
        this.scrollHeight = Math.max(0, this.scrollHeight + offset);
      }
    }
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/mixins"
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"

header
  @include mixins.flex-between
  top: 0
  z-index: 11
  padding: 50px 50px
  width: 100%
  
  height: geometry.var("nav-scroll-height")
  background-color: inherit

  // trick: make header stick out a bit
  // by filtering it with grayscale.
  filter: grayscale(30%) !important

  pointer-events: auto !important
  user-select: auto !important
  transition: geometry.var("default-transition")

  // blur when there's content underneath
  backdrop-filter: blur(3px)

  // center nav on the header when header is wider than nav.
  margin: 0 auto

  // retain header at top of page on scroll down.
  position: fixed

  @media (max-width: 1080px)
    padding: 0 40px
  
  @media (max-width: 768px)
    padding: 0 25px

  @media (prefers-reduced-motion: no-preference)
    height: geometry.var("nav-scroll-height")
    transform: translateY(0px)
    background-color: rgba(10, 25, 47, 0.85)
    box-shadow: 0 10px 30px -10px colors.color("navy-shadow")
    height: geometry.var("nav-scroll-height")

    // hide on scroll down
    // transform: translateY(calc(geometry.var("nav-scroll-height") * -1))
    box-shadow: 0 10px 30px -10px colors.color("navy-shadow")

</style>
