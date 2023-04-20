<template>
  <span class="blue">
    <slot />
  </span>
</template>

<script lang="ts">
export default {
  name: "Blue",
};
</script>

<style lang="sass" scoped>
.blue
  color: teal
</style>
