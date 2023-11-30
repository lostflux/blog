<template>
  <div class="square">
    <div
      class="inner"
      :style="{ 'padding-top': margin }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  margin: {
    type: String,
    default: "50%",
  },
})
</script>

<style lang="sass" scoped>
.square
  flex-direction: column
  width: 100%

  &::before
    padding: 50% 0
    content: ''
    float: left

  &::after
    display: table
    content: ''
    clear: both

  .inner
    display: flex
    flex-direction: column
    justify-content: space-between

</style>
