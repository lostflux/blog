<template>
  <!-- <nav>
    <TransitionGroup :component="null">
      <Transition
        class="fadedown"
        :timeout="timeout"
      >
        <div class="nav-inner">
          <Logo class="logo"/>
        </div>
      </Transition>
    </TransitionGroup>
    <NavLinks />
  </nav> -->
</template>

<script lang="ts" setup>
import { loaderDelay as timeout } from "~/modules/utils";
</script>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="sass" scoped>

// @use "~/styles/colors"
// @use "~/styles/typography"
// @use "~/styles/geometry"
// @use "~/styles/mixins"
// @use "~/styles/transitions"

// nav
//   @include mixins.flex-between
//   position: relative
//   width: 100%
//   max-width: 1600px
//   color: colors.color("lightest-foreground")
//   font-family: typography.font("monospace")
//   counter-reset: ite

// .nav-inner
//   width: 100px
//   height: 100%
//   color: colors.color("highlight")
//   background: yellow

// /* Fade down */
// .fadedown-enter
//   opacity: 0.01
//   transform: translateY(-20px)
//   transition: opacity 300ms geometry.var("default-easing"), transform 300ms geometry.var("default-easing")

// .fadedown-enter-active
//   opacity: 1
//   transform: translateY(0px)
//   transition: opacity 300ms geometry.var("default-easing"), transform 300ms geometry.var("default-easing")

</style>
