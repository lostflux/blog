<template>
  <figure class="prose-figure">
    <slot />
    <caption
      v-if="alt"
      class="prose-figure-alt"
    >
      <ContentRenderer
        :value="parsedCaption"
      />
    </caption>
  </figure>
</template>

<script lang="ts">

import markdownParser from "@nuxt/content/transformers/markdown";

export default {
  name: "ProseFigure",
  props: {
    alt: {
      type: String,
      default: "",
    },
  },
  async setup(props) {
    return {
      parsedCaption: await markdownParser.parse(props.alt, props.alt),
    };
  },
};

</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/mixins"

.prose-figure
  display: flex
  flex-direction: column
  place-items: center
  width: 100%
  margin: 40px 0

  .prose-figure-alt
    margin-top: 0.5rem
    font-size: typography.font-size("s")
    color: colors.color(lightest-foreground)
    text-align: center

</style>
