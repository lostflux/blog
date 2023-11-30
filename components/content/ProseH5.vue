<template>
  <h5
    :id="id"
    class="prose-h5"
  >
    <slot />
  </h5>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<style lang="sass" scoped>

@use "../styles/colors"
.prose-h5
  margin-top: 0.5em
  margin-bottom: 0.5em
  font-weight: 600
  font-size: 1rem
  color: colors.color("lightest-foreground")
</style>
