<template>
  <aside class="side-bar">
    <slot />
  </aside>
</template>

<script lang="ts">
export default {
  name: "StyledSideBar",
};
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/mixins"
@use "~/styles/geometry"
@use "~/styles/typography"

.side-bar
  @include mixins.flex-center
  position: fixed
  top: 0
  bottom: 0
  right: 0
  padding: 50px 10px
  width: min(75vw, 400px)
  height: 100vh
  outline: 0
  background-color: colors.color("light-background")
  box-shadow: -10px 0px 30px -15px colors.color("shadow") //
  z-index: 9
  // transform: translateX($props => (props.menuOpen ? 0 : 100)vw)
  // visibility: $props => (props.menuOpen ? 'visible' : 'hidden')
  transition: geometry.var("default-transition")

  // trick: make header stick out a bit
  // by filtering it with grayscale.
  filter: grayscale(30%) !important
  backdrop-filter: invert(100%) //blur(8px)

  nav
    @include mixins.flex-between
    width: 100%
    flex-direction: column
    color: colors.color("lightest-foreground")
    font-family: typography.font("monospace")
    text-align: center

  ol
    padding: 0
    margin: 0
    list-style: none
    width: 100%

    li
      position: relative
      margin: 0 auto 20px
      margin-left: 10px
      margin-right: 10px
      counter-increment: item 1
      font-size: clamp(typography.font-size("s"), 4vw, typography.font-size("l"))

      display: block
      text-align: left
      // background: black

      @media (max-width: 600px)
        margin: 0 auto 10px

      &:before
        content: '0' counter(item) '.'
        margin-bottom: 5px
        color: colors.color("primary-highlight")
        font-size: typography.font-size("s")

        position: absolute
        // background: yellow
        margin-right: 30px
        white-space: pre-wrap
        display: block
        // width: 10%
        padding-right: 5px

    a
      @include mixins.link
      width: 100%
      padding: 3px 20px 20px

  .resume-link
    @include mixins.big-button
    padding: 18px 50px
    margin: 10% auto 0
    width: max-content

</style>
