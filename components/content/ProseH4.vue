<template>
  <NuxtLink
    v-if="generate"
    :to="`#${id}`"
    class="prose-title-wrapper"
  >
    <h4
      :id="id"
      class="prose-h4"
    >
      <slot />
    </h4>
  </NuxtLink>
  <div
    v-else
    class="prose-title-wrapper"
  >
    <h4
      :id="id"
      class="prose-h4"
    >
      <slot />
    </h4>
  </div>
  <br>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

defineProps<{ id: string }>();
const heading = 4;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading);
</script>

<style lang="sass" scoped>

@use "~/styles/colors"
@use "~/styles/geometry"

.prose-title-wrapper
  margin-top: 0.5em
  margin-bottom: 0.5em

  .prose-h4
    font-weight: 500
    font-size: 1.1rem
    color: colors.color("lightest-foreground")
    display: inline

    &::before
      content: "####"
      margin-right: 0.5rem
      opacity: 0.5
      transition: geometry.var("default-transition")

    &:hover::before
      opacity: 1
</style>
