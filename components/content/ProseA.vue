<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  blank: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <NuxtLink :href="href">
    <slot />
  </NuxtLink>
</template>

<style lang="sass" scoped>

@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

a
  @include mixins.inline-link

</style>
