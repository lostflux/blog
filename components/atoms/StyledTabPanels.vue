<template>
  <div class="styled-tab-panels">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledTabPanels",
}
</script>

<style lang="sass" scoped>

.styled-tab-panels
  position: relative
  width: 100%
  margin-left: 20px
  min-height: 512px

  @media (max-width: 600px) 
    margin-left: 0
    margin-top: 20px
</style>
