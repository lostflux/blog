<template>
  <a class="styled-button animated">
    <div class="mask">
      <span class="text">
        <slot />
      </span>
    </div>
  </a>
</template>

<script lang="ts">
export default {
  name: "AnimatedStyledButton",
};
</script>

<style lang="sass" scoped>
@use "~/styles/mixins"
@use "~/styles/colors"

.styled-button
  @include mixins.big-button
  margin: min(2em, 2vw)
  text-transform: uppercase
  font-weight: 600
  font-size: 0.6em !important

.animated
  width: fit-content
  display: inline-flex
  flex-direction: row
  position: relative

  .mask
    // border-right: 0.7em solid colors.color("primary-highlight")
    // background-color: green
    max-height: 1em
    overflow: hidden
    padding-right: 0.7em
    -webkit-animation: typing 5.5s steps(30, end) //, blink-caret .5s step-end infinite
    -moz-animation: typing 5.5s steps(30, end) //, blink-caret .5s step-end infinite
    -ms-animation: typing 5.5s steps(30, end) //, blink-caret .5s step-end infinite
    -o-animation: typing 5.5s steps(30, end) //, blink-caret .5s step-end infinite
    animation: typing 5.5s steps(30, end) //, blink-caret .5s step-end infinite
    position: relative

    &::after
      // content: ""
      content: "?"
      display: inline-flex
      flex-direction: row
      width: 0.7em
      width: fit-content
      // height: 0.1em
      vertical-align: bottom
      margin-left: 0.2em
      // background-color: colors.color("primary-highlight")
      animation: blink-caret .5s step-end infinite
      position: absolute
      right: 0
      // transform: translateX(100%)
      bottom: 0

    .text
      overflow: hidden // Ensures the content is not revealed until the animation
      line-height: 3px
      white-space: nowrap
      margin: 0 auto
      width: fit-content

/* The typing effect */
// @keyframes typing
//   from
//     width: 0
//   to
//     width: 100%

/* The typewriter cursor effect */
@keyframes blink-caret
  from, to
    // border-color: transparent
    color: transparent
    opacity: 0
  50%
    color: colors.color("primary-highlight")
    opacity: 100%
</style>
