<template>
  <header
    ref="headerRef"
    class="header"
    :style="style"
  >
    <div class="nav-container">
      <Nav class="nav-in-container"/>
      <StyledMenuButton
        @click="toggleMenu"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
        ref="buttonRef"
        class="menu-button"/>
    </div>
    <div
      v-show="menuOpen"
      class="site-menu">
      <SearchBar ref="searchBar"/>
      <div class="menu-columns-wrapper">
        <div class="menu-column">
          <NuxtLink
            :to="path"
            class="menu-column-header"
          >
            <strong> Current Page </strong>
          </NuxtLink>
          <NuxtLink
            v-for="item in dummyData"
            :to="path"
            class="menu-column-item"
          >
            {{ item }}
          </NuxtLink>
        </div>
        <div class="menu-column">
          <NuxtLink
            :to="path"
            class="menu-column-header"
          >
            <strong> Blog </strong>
          </NuxtLink>
          <NuxtLink
            v-for="item in dummyData"
            :to="path"
            class="menu-column-item"
          >
            {{ item }}
          </NuxtLink>
        </div>
        <div class="menu-column">
          <NuxtLink
            :to="path"
            class="menu-column-header"
          >
            <strong> Publications </strong>
          </NuxtLink>
          <NuxtLink
            v-for="item in dummyData"
            :to="path"
            class="menu-column-item"
          >
            {{ item }}
          </NuxtLink>
        </div>
        <div class="menu-column">
          <NuxtLink
            :to="path"
            class="menu-column-header"
          >
            <strong> Research </strong>
          </NuxtLink>
          <NuxtLink
            v-for="item in dummyData"
            :to="path"
            class="menu-column-item"
          >
            {{ item }}
          </NuxtLink>
        </div>
      </div>
      <div class="menu-extras">
        <div class="menu-extras-links">
          <NuxtLink
            to="/"
            class="menu-column-header"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/"
            class="menu-column-header"
          >
            Misc
          </NuxtLink>
        </div>
        <div class="menu-extras-footer">
          <AppFooter class="menu-footer"/>
        </div>
      </div>
    </div>
  </header>
</template>


<script lang="ts">
export default {
  name: "AppHeader",
  data() {
    return {
      scrollSpeed: 1,
      lastScrollPosition: 0,
      scrollHeight: 0,
      height: 0,
      menuOpen: false,
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
      return this.scrolledToTop
        ? `box-shadow: none`
        : `transform: translateY(-${this.scrollHeight}px)`;
    },
    scrolledToTop() {
      return this.lastScrollPosition <= 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    
    // set height initially.
    // this.height = this.$refs.header?.offsetHeight || 0;
    this.height = this.$el.offsetHeight;

    // update height on resize!
    // window.addEventListener("resize", () => {
    //   this.height = this.$refs.header?.offsetHeight || 0;
    // });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    menuOpen: {
      handler: function(newVal, oldVal) {
        // if (this.menuOpen) {
        //   document.body.style.overflow = "hidden";
        // } else {
        //   document.body.style.overflow = "auto";
        // }
        this.height = this.$refs.header?.offsetHeight || 0;
        console.log(`height: ${this.height}`);
      },
      deep: true,
    },
  },
  methods: {
    toggleMenu() {
      // if (this.menuOpen) {
      //   document.body.style.overflow = "hidden";
      // } else {
      //   document.body.style.overflow = "auto";
      // }
      this.height = this.$refs.header.offsetHeight || 0;
    },
    onResize({ width, height }) {
      console.log(`width: ${width}, height: ${height}`);
      this.height = height;
    },

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

<script lang="ts" setup>

//
//
// MENU BUTTON STUFF
//
//

const { path } = useRoute();

const dummyData = [ "One", "Two", "Three", "Four" ];

const menuOpen = ref(false);
const buttonRef = ref(null);
const headerRef = ref(null);
const searchBar = ref(null);


const closeMenu = () => {
  console.log(`Menu Closed!`);
  menuOpen.value = false;
}

const openMenu = () => {
  console.log(`Menu Opened!`);
  menuOpen.value = true;
  document.getElementById("searchbar")?.focus();
  // searchBar.value.focus();
  // onClickOutside(header, closeMenu);
}

const toggleMenu = () => {
  console.log(`
  menuOpen: ${menuOpen.value !== null}
  buttonRef: ${buttonRef.value !== null}
  header: ${headerRef.value !== null}
  searchBar: ${searchBar.value !== null}
`);

  console.log(`Menu Toggled!`);
  buttonRef.value.toggle();
  headerRef.value.menuOpen = !headerRef.value.menuOpen;
  // headerRef.value.toggleMenu();
  console.log(`menuOpen: ${headerRef.value.menuOpen}`);
  menuOpen.value
    ? closeMenu()
    : openMenu();
}
</script>


<style lang="sass" scoped>
@use "~/styles/mixins"
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"

.header
  @include mixins.flex-between
  top: 0
  z-index: 11
  padding: 0 50px
  width: 100%
  position: fixed
  display: block
  overflow: auto
  
  // height: auto //geometry.var("nav-scroll-height")
  // background-color: inherit

  // trick: make header stick out a bit
  // by filtering it with grayscale.
  filter: grayscale(30%) !important

  // blur when there's content underneath
  backdrop-filter: blur(8px)

  pointer-events: auto !important
  user-select: auto !important
  transition: geometry.var("default-transition")


  // center nav on the header when header is wider than nav.
  margin: 0 auto

  // background-color: green

  @media (max-width: 1080px)
    padding: 0 40px
  
  @media (max-width: 768px)
    padding: 0 25px

  @media (prefers-reduced-motion: no-preference)
    // height: geometry.var("nav-scroll-height")
    box-shadow: 0 10px 30px -10px colors.color("navy-shadow")
    // height: geometry.var("nav-scroll-height")
    box-shadow: 0 10px 30px -10px colors.color("navy-shadow")


.nav-container
  display: flex
  justify-content: space-between
  column-gap: 20px

  position: relative
  max-width: 1600px
  width: auto
  margin: 0 auto
  // margin-top: 20px
  // margin-bottom: 20px
  // background-color: yellow

.nav-in-container
  margin: 10px
  max-width: 100%
  height: geometry.var("nav-scroll-height")
  margin: auto
  // background-color: purple

.menu-button
  position: absolute
  right: 20px
  // background-color: orange
  height: 100%
  padding-right: 20px       /// keep button abreast.

.site-menu
  display: block
  position: relative
  overflow: hidden
  max-width: 1600px
  width: 100%
  flex-direction: column
  // background-color: #0053d6
  min-height: auto
  max-height: 70vh
  margin: auto
  margin-top: 20px
  margin-bottom: 20px
  overflow: hidden
  border-top: 1px solid colors.color("lightest-navy")
  color: colors.color("lightest-slate")
  font-weight: 500
  line-height: 2

.menu-columns-wrapper
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 100%
  width: 100%
  // background-color: yellow
  margin: 40px 0 40px 0
  border-top: 1px solid colors.color("lightest-navy")
  color: inherit

.menu-column
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 100%
  width: 100%
  // background-color: inherit
  padding-left: 10px
  color: inherit

.menu-column-header > *
  font-family: typography.font("font-sans")
  font-size: typography.font-size("xxl")
  color: inherit

.menu-column-item > *
  font-family: typography.font("font-sans")
  font-size: typography.font-size("xl")
  color: inherit

.menu-extras
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 100%
  width: 100%
  border-top: 1px solid colors.color("lightest-navy")

.menu-extras-links
  display: flex
  justify-items: center
  align: center
  flex-direction: column
  // justify-content: space-between
  height: 100%
  width: 100%
  // background-color: green
  width: 50%
  padding-left: 10px
  align-items: left
  margin: 40px

.menu-extras-footer
  width: 50%

.menu-footer
  float: right
  margin-top: 0
  top: 0px
  width: 100%
  // background-color: purple

</style>
