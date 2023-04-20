<template>
  <span class="highlight-inner">
    <slot />
  </span>
</template>

<script lang="ts">
export default {
  name: "Highlight",
};
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"
.highlight-inner
  color: colors.color("secondary-highlight")
  font-size: inherit

:not(.paragraph)
  .highlight-inner
    padding-top: 4em
</style>
