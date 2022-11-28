<template>
  <header class="header">
    <Nav class="nav"/>
  </header>
</template>
<!-- 
<script lang="ts" setup>

import {useState, useEffect} from '~/src/stateful';
import { useScrollDirection, usePrefersReducedMotion } from '~/src/hooks';

const [scrollDirection, setScrollDirection] = useState("down");
</script> -->


<script lang="ts">
export default {
  props: {
    scrollDirection: {
      type: String,
      default: "down",
    },
    scrolledToTop: {
      type: Boolean,
      default: true,
    },
  },
  name: "AppHeader",
};
</script>

<style lang="sass" scoped>
@use "~/styles/mixins"
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"

header
  @apply mixins.flex-between
  position: fixed
  top: 0
  z-index: 11
  padding: 50px 0px
  width: inherit
  max-width: inherit
  margin: 0 auto
  height: geometry.var("nav-height")
  background-color: inherit
  filter: none !important
  pointer-events: auto !important
  user-select: auto !important
  backdrop-filter: blur(10px)
  transition: geometry.var("default-transition")
  display: flex // move items to right of logo
  align-items: center // remove

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
