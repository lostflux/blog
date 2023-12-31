<template>
  <div>
    <ProseHr />
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
  </div>
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

.prose-h2
  // font-size: typography.font-size(m)
  // font-weight: 600
  // color: colors.color(lightest-foreground)
  margin: 2em 0 2em 0
  // padding: 0
  // line-height: 0.9em
  // font-size: typography.font-size(l)
  text-transform: uppercase
</style>
