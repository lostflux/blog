<template>
  <ul id="styled-projects-grid">
    <slot />
  </ul>
</template>

<script lang="ts">
export default {
  name: "StyledProjectsGrid",
};
</script>

<style lang="sass">
@use "~/styles/mixins"

#styled-projects-grid
  @include mixins.reset-list

  a
    position: relative
    z-index: 1
</style>
