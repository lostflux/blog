<template>
  <NuxtLink
    v-if="generate && id"
    :to="`#${id}`"
    class="prose-title-wrapper"
  >
    <h1
      :id="id"
      class="prose-h1"
    >
      <slot />
    </h1>
  </NuxtLink>
  <div
    v-else
    class="prose-title-wrapper"
  >
    <h1
      :id="id"
      class="prose-h1"
    >
      <slot />
    </h1>
  </div>
  <!-- <br> -->
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { useRuntimeConfig } from "#imports"

defineProps({
  id: {
    type: String,
    default: "",
  },
})
const heading = 1
const { anchorLinks } = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading
</script>

<style lang="sass" scoped>

@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

.prose-h1
  color: colors.color(light-foreground)
  font-size: typography.font-size(m)
  font-weight: 600
  margin: 0 0 2em 0
  padding: 0
  line-height: 0.9em
</style>
