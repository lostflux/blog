<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "@/styles/mixins"
@use "@/styles/typography"
.prose-ul
  font-size: inherit
  line-height: 22px
  color: inherit
  margin: 1em 0 1em 1em

  font-size: typography.font-size("l")

  @media screen and (max-width: 720px)
    font-size: typography.font-size("m")

  .prose-li
    position: relative
    padding-left: 0.7em
    margin-bottom: 10px
    font-weight: 400
    line-height: inherit
    color: inherit
    padding-left: 1.5em

    &::before
      content: "—"
      position: absolute
      left: 0
      font-weight: 600
</style>
