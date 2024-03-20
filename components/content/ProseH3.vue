<template>
  <NuxtLink
    v-if="generate && id"
    :to="`#${id}`"
    class="prose-title-wrapper"
  >
    <h3
      :id="id"
      class="prose-h3"
    >
      <slot />
    </h3>
  </NuxtLink>
  <div
    v-else
    class="prose-title-wrapper"
  >
    <h3
      :id="id"
      class="prose-h3"
    >
      <slot />
    </h3>
    <br>
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

.prose-h3
  // font-size: typography.font-size(m)
  // font-weight: 500
  // color: colors.color(light-foreground)
  // margin: 2em 0 0.5em // 0.5em 0
  // padding: 0
  // line-height: 0.9em
  margin-top: 3em
  font-size: typography.font-size(l)
  font-weight: 500

  text-transform: lowercase

  &::before
    // right arrow -> as content
    content: "\2192  "

</style>
