<template>
  <div
    class="inline-flex-div"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">

// define props
defineProps({
  justify: {
    type: String,
    default: "left",
  },
  align: {
    type: String,
    default: "left",
  },
});
</script>
<style lang="sass" scoped>
.inline-flex-div
  width: 100%
  display: inline-flex
  gap: 10px
  padding: 10px
</style>
