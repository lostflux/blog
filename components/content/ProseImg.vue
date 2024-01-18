<template>
  <figure class="prose-img-wrapper">
    <NuxtImg
      class="prose-img"
      :src="refinedSrc"
      :alt="alt"
      loading="lazy"
    />
    <caption
      v-if="alt"
      class="prose-img-alt"
      v-html="alt"
    />
  </figure>
</template>

<script setup lang="ts">
import { withBase } from "ufo"

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const route = useRoute()
const refinedSrc = computed(() => withBase(props.src, route.path))
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/mixins"

.prose-img-wrapper
  margin: 1rem 0
  max-width: 100%
  display: flex
  flex-direction: column
  align-items: center

  font-size: typography.font-size(s)
  color: colors.color(lightest-foreground)

  .prose-img
    max-width: 100%
    max-height: 100%
    object-fit: contain
    border-radius: 0.3rem

  .prose-img-alt
    margin-top: 0.5rem
    text-align: center
</style>
