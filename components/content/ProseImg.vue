<template>
  <figure class="prose-img-wrapper">
    <img
      class="prose-img"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
    >
    <caption
      v-if="alt"
      class="prose-img-alt"
    >
      {{ alt }}
    </caption>
  </figure>
</template>

<script setup lang="ts">
import { withBase } from "ufo";
import { useRuntimeConfig, computed } from "#imports";

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
});
const refinedSrc = computed(() => {
  return withBase(props.src, useRoute().path);
  // if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
  //   // return withBase(props.src, useRuntimeConfig().app.baseURL)
  // }
  // return props.src
});
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/mixins"

.prose-img-wrapper
  margin: 1rem 0
  max-width: 100%
  display: flex
  flex-direction: column
  align-items: center

  .prose-img
    max-width: 100%
    max-height: 100%
    object-fit: contain
    border-radius: 0.3rem

  .prose-img-alt
    margin-top: 0.5rem
    font-size: typography.font-size("s")
    color: colors.color("secondary-highlight")
    text-align: center
</style>
