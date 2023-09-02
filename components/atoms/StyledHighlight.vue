<template>
  <div
    :class="{
      'styled-highlight': true,
      'horizontal': mode === 'horizontal'
    }"
    :style="style"
  />
</template>

<script lang="ts">

const tabHeight = 42;
const tabWidth = 120;

export default {
  name: "StyledHighlight",
  props: {
    mode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      index: 0,
      vertical: true,
    };
  },
  computed: {
    style() {
      if (this.mode === "horizontal") {
        return `
            -webkit-transform: translateX(${this.index * tabWidth}px);
            -moz-transform: translateX(${this.index * tabWidth}px);
            -ms-transform: translateX(${this.index * tabWidth}px);
            -o-transform: translateX(${this.index * tabWidth}px);
            transform: translateX(${this.index * tabWidth}px);`;
      }
      return this.vertical
        ? `
              -webkit-transform: translateY(${this.index * tabHeight}px);
              -moz-transform: translateY(${this.index * tabHeight}px);
              -ms-transform: translateY(${this.index * tabHeight}px);
              -o-transform: translateY(${this.index * tabHeight}px);
              transform: translateY(${this.index * tabHeight}px);`
        : `
              -webkit-transform: translateX(${this.index * tabWidth}px);
              -moz-transform: translateX(${this.index * tabWidth}px);
              -ms-transform: translateX(${this.index * tabWidth}px);
              -o-transform: translateX(${this.index * tabWidth}px);
              transform: translateX(${this.index * tabWidth}px);`;
    },
  },

  watch: {
    index(newIndex: number) {
      // re-render the component
      this.$forceUpdate();
    },
    vertical(newVertical: boolean) {
      // re-render the component
      this.$forceUpdate();
    },
  },
  mounted() {
    this.vertical = window.innerWidth > 600;
    window.addEventListener("resize", () => {
      this.vertical = window.innerWidth > 600;
      // this.$forceUpdate();
    });
    screen.orientation.addEventListener("change", () => {
      this.vertical = window.innerWidth > 600;
      // this.$forceUpdate();
    });
  },

  unmounted() {
    window.removeEventListener("resize", () => {
      this.vertical = window.innerWidth > 600;
      // this.$forceUpdate();
    });
    screen.orientation.removeEventListener("change", () => {
      this.vertical = window.innerWidth > 600;
      // this.$forceUpdate();
    });
  },
  methods: {
    highlight(newIndex: number) {
      this.index = newIndex;
    },
  },
};

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
  background: colors.color("primary-highlight")

  -webkit-transform: translateY(geometry.var("tab-height"))
  -webkit-transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  -webkit-transition-delay: 0.1s

  -moz-transform: translateY(geometry.var("tab-height"))
  -moz-transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  -moz-transition-delay: 0.1s

  -ms-transform: translateY(geometry.var("tab-height"))
  -ms-transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  -ms-transition-delay: 0.1s

  -o-transform: translateY(geometry.var("tab-height"))
  -o-transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  -o-transition-delay: 0.1s

  transform: translateY(geometry.var("tab-height"))
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  transition-delay: 0.1s

  &.horizontal
    top: auto
    top: auto
    bottom: 0
    width: geometry.var("tab-width")
    max-width: geometry.var("tab-width")
    height: 2px

  @media (max-width: 600px)
    top: auto
    bottom: 0
    width: geometry.var("tab-width")
    max-width: geometry.var("tab-width")
    height: 2px

</style>
