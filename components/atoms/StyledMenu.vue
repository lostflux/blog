<template>
  <div class="styled-menu">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledMenu",
};
</script>

<style lang="sass">
.styled-menu
  display: block
</style>
