<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/mixins"

blockquote
  // all: unset
  width: 100%
  text-align: center
  position: relative
  margin: 2rem auto !important
  border-left: none !important
  // background: yellow

  padding: 3rem 2rem 0 2rem

  .paragraph
    // all: unset
    width: 80%
    margin: 0 auto !important
    font-size: clamp(1rem, 1.7vw, 1.5rem) !important
    font-weight: 500 !important
    line-height: 1.5 !important
    color: colors.color("lightest-foreground")


    &:before
      content: "“"
      font-weight: 700
      font-size: clamp(30px, 10rem, 120px)
      line-height: 1
      opacity: 0.2
      z-index: 0
      position: absolute
      left: 5%
      top: 0

      color: colors.color("primary-highlight")

    &:after
      content: "”"
      font-weight: 700
      font-size: clamp(30px, 10rem, 120px)
      line-height: 1
      opacity: 0.2
      position: absolute
      right: 5%
      bottom: 3rem
      color: colors.color("primary-highlight")

  & > hr
    max-width: 20%
    size:  10px
    margin: 1em  auto 0 auto !important

</style>
