<template>
  <button class="styled-button">
    <slot />
  </button>
</template>

<script lang="ts">
  export default {
    name: "StyledButton",
  }
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"

.styled-button
  @include mixins.link
  display: flex
  align-items: center
  width: 100%
  height: geometry.var("tab-height")
  padding: 0 20px 2px
  border-left: 2px solid colors.color("lightest-navy")
  background-color: transparent
  font-family: typography.font("font-mono")
  font-size: typography.font-size("xs")
  text-align: left
  white-space: nowrap

  @media (max-width: 768px)
    padding: 0 15px 2px
  
  @media (max-width: 600px)
    @apply mixins.flex-center
    min-width: 120px
    padding: 0 15px
    border-left: 0
    border-bottom: 2px solid colors.color("lightest-navy")
    text-align: center
  
  &:hover
    background-color: colors.color("light-navy")

  &:active
    color: colors.color("green")

</style>
