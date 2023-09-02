<template>
  <blockquote class="prose-blockquote">
    <slot />
  </blockquote>
</template>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/mixins"

.prose-blockquote
  width: calc(100% - 1rem)
  text-align: left
  position: relative
  margin: 0.5rem
  padding: 0 2rem 0 1em
  border-left: 2px solid colors.color(primary-highlight)

  .prose-p
    width: 100%
    font-size: 1em
    font-weight: 500
    color: colors.color(primary-highlight)

  & > hr
    max-width: 80%
    size:  10px
    margin: 1em 0 !important

</style>
