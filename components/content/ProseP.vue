<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style lang="sass" scoped>
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/geometry"
@use "@/styles/mixins"

.prose-p
  font-family: typography.font("sans-serif"), sans-serif
  // margin-bottom: 1em
  line-height: 24px

  // if not following a .prose-hr, indent first line
  // :not(.prose-hr, .prose-title-wrapper) + &
  //   &:not(:first-child)
  //     text-indent: 1.5em

  &:not(:last-child)
    margin: 0 0 1.5em 0
</style>
