<template>
  <h1
    :id="id"
    class="prose-h1"
  >
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

defineProps<{ id: string }>();
const heading = 1;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading);
</script>

<style lang="sass" scoped>

@use "../styles/colors"
@use "../styles/typography"
.prose-h1
  margin-top: 1.5rem
  margin-bottom: 1.5rem
  font-weight: 700
  font-size: typography.font-size("xxl")
  color: colors.color("primary-highlight")
</style>
