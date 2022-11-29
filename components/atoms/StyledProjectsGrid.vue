<template>
  <ul id="styled-projects-grid">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "~/styles/mixins"

#styled-projects-grid
  @include mixins.reset-list

  a
    position: relative
    z-index: 1
</style>

<script lang="ts">
  export default {
    name: "StyledProjectsGrid",
  }
</script>



