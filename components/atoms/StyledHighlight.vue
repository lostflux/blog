<template>
  <div
    class="styled-highlight"
    :style="style"
  >
    <slot />
  </div>
</template>


<script lang="ts">

const tabHeight = 42;

  export default {
    name: "StyledHighlight",
    data() {
      return {
        index : 0,
      }
    },
    methods : {
      highlight(newIndex: number) {
        console.log(`Moving position of highlight!!`);
        this.index = newIndex;
      },
    },
    computed: {
      style() {
        return `transform: translateY(${this.index * tabHeight}px)`;
      },
    },

    watch: {
      index(newIndex: number) {

        console.log(`index changed to ${newIndex}`);
        console.log(`style is ${this.style}`);
        
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
    width: 100%
    max-width: geometry.var("tab-width")
    height: 2px
    margin-left: 50px
    transform: translateX(geometry.var("tab-width"))

  @media (max-width: 480px) 
    margin-left: 2

</style>
