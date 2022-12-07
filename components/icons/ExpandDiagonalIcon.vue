<template>
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 6.5H18.5V11M11 18.5H6.5V14"
      stroke-width="1.2"
    />
    <path
      d="M18.5 6.5L14 11M6.5 18.5L11 14"
      stroke-width="1.2"
    />
  </svg>
</template>

<script lang="ts">
export default {
  name: "ExpandDiagonalIcon",
};
</script>

<style lang="sass" scoped>
svg
  stroke: currentcolor
  stroke-width: 3

  path
    stroke: currentcolor
    stroke-width: 2
</style>
