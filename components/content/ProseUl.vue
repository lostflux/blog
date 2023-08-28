<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "@/styles/mixins"
@use "@/styles/typography"
.prose-ul
  margin-left: 0.5em
  font-family: typography.font("sans-serif")
  font-size: inherit
  line-height: 22px
  margin: 1em 0 1em 1em

  .prose-li
    position: relative
    padding-left: 20px
    margin-bottom: 10px
    font-weight: 400
    line-height: inherit
    font-size: typography.font-size("m")

    &::before
      // show em-dash
      content: "— "
      position: absolute
      left: 0
      font-weight: 600
</style>
