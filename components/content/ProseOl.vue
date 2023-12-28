<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<style lang="sass">
@use "@/styles/typography"

.prose-ol
  counter-reset: ol-count

  // margin: 2em 0

  font-size: typography.font-size("l")

  @media screen and (max-width: 720px)
    font-size: typography.font-size("m")

  & > li
    counter-increment: ol-count
    position: relative
    padding-left: 1.5em
    margin-bottom: 0.7em

    &::before
      content: counter(ol-count) '.'
      position: absolute
      left: 0
</style>
