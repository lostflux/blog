<template>
  <div
    class="inline-flex-div"
    :style="{
      justifyContent: justify,
    }"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps({
  justify: {
    type: String,
    default: "space-evenly",
  },
  align: {
    type: String,
    default: "center",
  },
})
</script>
<style lang="sass" scoped>
.inline-flex-div
  width: 100%
  display: flex
  gap: 10px
  padding-top: 20px
</style>
