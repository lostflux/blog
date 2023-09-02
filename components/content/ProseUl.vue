<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "@/styles/mixins"
@use "@/styles/typography"
.prose-ul
  // font-family: typography.font("sans-serif")
  font-size: inherit
  line-height: 22px
  //margin-left: 0.5em
  color: inherit
  margin: 2em 0

  font-size: typography.font-size("l")

  @media screen and (max-width: 720px)
    font-size: typography.font-size("m")

  .prose-li
    position: relative
    padding-left: 0.7em
    margin-bottom: 10px
    font-weight: 400
    line-height: inherit
    // font-size: typography.font-size("m")
    color: inherit
    margin-left: 1em

    &::before
      // show em-dash
      content: "— "
      position: absolute
      left: -1em
      font-weight: 600
</style>
