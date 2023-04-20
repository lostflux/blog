<template>
  <button
    class="menu-button"
    :class="clicked ? 'clicked' : ''"
    aria-controls="primary-navigation"
    aria-expanded="false"
    @click="click"
  >
    <svg
      class="hamburger"
      viewBox="0 0 100 100"
    >
      <rect
        class="line top"
        width="80%"
        height="6px"
        fill="currentColor"
        x="10"
        y="40"
        rx="0"
      />

      <rect
        class="line bottom"
        width="56%"
        height="6px"
        fill="currentColor"
        x="34"
        y="60"
        rx="0"
      />

    </svg>
  </button>
</template>

<script lang="ts">

export default {
  name: "StyledMenuButton",
  data() {
    return {
      menuOpen: false,
      clicked: false,
    };
  },
  methods: {
    toggle() {
      this.menuOpen = !this.menuOpen;
    },
    click() {
      this.clicked = !this.clicked;
    },
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/colors"

// svg
//   padding: 0 5px

.menu-button
  background: transparent
  z-index: 25
  color: colors.color("primary-highlight")

  .line

    -webkit-transition: 0.1s
    -moz-transition: 0.1s
    -ms-transition: 0.1s
    -o-transition: 0.1s
    transition: 0.1s

    -webkit-transform-origin: center
    -moz-transform-origin: center
    -ms-transform-origin: center
    -o-transform-origin: center
    transform-origin: center

.menu-button

  &:hover
    .top
      width: 56%
      x: 34

    .bottom
      width: 80%
      x: 10

  &.clicked

    .top, .bottom
      width: 70%
      x: 15%
      y: 47%

    .top
      -webkit-transform: rotate(45deg)
      -moz-transform: rotate(45deg)
      -ms-transform: rotate(45deg)
      -o-transform: rotate(45deg)
      transform: rotate(45deg)

    .bottom
      -webkit-transform: rotate(-45deg)
      -moz-transform: rotate(-45deg)
      -ms-transform: rotate(-45deg)
      -o-transform: rotate(-45deg)
      transform: rotate(-45deg)

</style>
