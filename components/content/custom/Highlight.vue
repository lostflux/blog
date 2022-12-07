<template>
  <span class="yellow">
    <slot />
  </span>
</template>

<script lang="ts">
  export default {
    name: "Highlight",
  }
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
.yellow
  color: colors.color("highlight")
</style>
