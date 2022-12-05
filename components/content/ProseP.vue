<template>
  <p class="paragraph">
    <slot />
  </p>
</template>

<style lang="sass" scoped>
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

.paragraph
  font-family: typography.font("font-sans")
  font-size: typography.font-size("m")
  color: colors.color("light-slate")

  ul
    display: grid
    grid-template-columns: repeat(2, minmax(140px, 200px))
    grid-gap: 0 10px
    padding: 0
    margin: 20px 0 0 0
    overflow: hidden
    list-style: none

    li
      position: relative
      margin-bottom: 10px
      padding-left: 20px
      font-family: typography.font("font-mono")
      font-size: typography.font-size("xs")

      &:before
        content: '▹'
        position: absolute
        left: 0
        color: colors.color("green")
        font-size: typography.font-size("s")
        line-height: 12px

  a
    @include mixins.inline-link
</style>
