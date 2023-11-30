<template>
  <h6
    :id="id"
    class="prose-h6"
  >
    <slot />
  </h6>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<style lang="sass" scoped>

@use "../styles/colors"
.prose-h6
  margin-top: 0.5em
  margin-bottom: 0.5em
  font-weight: 300
  font-size: 1rem
  color: colors.color("lightest-foreground")
</style>
