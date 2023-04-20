<template>
  <h4
    :id="id"
    class="prose-h4"
  >
    <slot />
  </h4>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

defineProps<{ id: string }>();
const heading = 4;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading);
</script>

<style lang="sass" scoped>

@use "../styles/colors"
.prose-h4
  margin-top: 0.5em
  margin-bottom: 0.5em
  font-weight: 500
  font-size: 1.2rem
  color: colors.color("lightest-foreground")
</style>
