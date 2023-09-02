<template>
  <NuxtLink
    v-if="generate && id"
    :to="`#${id}`"
    class="prose-title-wrapper"
  >
    <h2
      :id="id"
      class="prose-h2"
    >
      <slot />
    </h2>
  </NuxtLink>
  <div
    v-else
    class="prose-title-wrapper"
  >
    <h2
      :id="id"
      class="prose-h2"
    >
      <slot />
    </h2>
  </div>
  <br>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

defineProps({
  id: {
    type: String,
    default: "",
  },
});
const heading = 1;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate = anchorLinks?.depth >= heading;
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

.prose-h2
  font-size: typography.font-size(m)
  font-weight: 600
  color: colors.color(lightest-foreground)
  margin: 1em 0 0.5em 0
  padding: 0
  line-height: 0.9em
  font-size: typography.font-size(l)
</style>
