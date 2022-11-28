<template>
  <div id="styled-text">
    <slot />
  </div>
</template>

<script lang="ts">
  export default {
    name: "StyledText",
  }
</script>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"

#styled-text
  font-family: typography.font("font-sans")
  font-size: typography.font-size("m")


  .styled-list, #styled-list
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
</style>
