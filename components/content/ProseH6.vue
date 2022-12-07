<template>
  <h6
    :id="id"
    class="prose-h6"
  >
    <slot />
  </h6>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

defineProps<{ id: string }>();
const heading = 6;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading);
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
