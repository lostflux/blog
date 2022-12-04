<template>
  <div
    class="styled-highlight"
    :style="style"
  >
    <!-- <slot /> -->
  </div>
</template>


<script lang="ts">

const tabHeight = 42;
const tabWidth = 120;

  export default {
    name: "StyledHighlight",
    data() {
      return {
        index : 0,
        vertical: true
      }
    },
    methods : {
      highlight(newIndex: number) {
        this.index = newIndex;
      },
    },
    computed: {
      style() {
        return this.vertical
          ? `transform: translateY(${this.index * tabHeight}px);`
          : `transform: translateX(${this.index * tabWidth}px);`;
      },
      vertical() {
        if (typeof window !== "undefined") {
          return window.innerWidth > 600;
        }
        return false;
      },
    },
    mounted() {
      this.vertical = window.innerWidth > 600;
      window.addEventListener("resize", () => {
        this.vertical = window.innerWidth > 600;
        this.$forceUpdate();
      });
    },

    unmounted() {
      window.removeEventListener("resize", () => {
        this.vertical = window.innerWidth > 600;
        this.$forceUpdate();
      });
    },

    watch: {
      index(newIndex: number) {
        
        // re-render the component
        this.$forceUpdate();
      },
    },
  }

</script>

<style lang="sass">
@use "~/styles/geometry"
@use "~/styles/colors"
   
.styled-highlight

  position: absolute
  top: 0
  left: 0
  z-index: 10
  width: 2px
  height: geometry.var("tab-height")
  border-radius: geometry.var("border-radius")
  background: colors.color("green")

  transform: translateY(geometry.var("tab-height"))
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  transition-delay: 0.1s

  @media (max-width: 600px) 
    top: auto
    bottom: 0
    width: 120px //geometry.var("tab-width")
    max-width: geometry.var("tab-width")
    height: 2px
    margin-left: 50px
    // transform: translateX(geometry.var("tab-width"))

  // @media (max-width: 480px) 
  //   margin-left: 2

</style>
