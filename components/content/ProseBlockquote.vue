<template>
  <blockquote class="prose-blockquote">
    <slot />
  </blockquote>
</template>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/mixins"

.prose-blockquote
  width: calc(100% - 4rem)
  text-align: left
  position: relative
  margin: 2rem
  padding: 0 2rem 0 2rem

  .prose-p
    width: 80%
    font-size: clamp(1rem, 1.7vw, 1.5rem) //1.2em
    font-weight: 500
    line-height: 1.5
    color: colors.color("secondary-highlight")

  & > hr
    max-width: 80%
    size:  10px
    margin: 1em 0 !important

</style>
