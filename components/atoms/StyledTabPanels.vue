<template>
  <div class="styled-tab-panels">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledTabPanels",
};
</script>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"

.styled-tab-panels
  line-height: 23px
  position: relative
  width: 100%
  margin-left: 20px
  min-height: 512px
  color: colors.color(foreground)

  @media (max-width: 600px)
    margin-left: 0
    margin-top: 20px

  * > ul
    font-size: typography.font-size("m")
</style>
