<template>
  <div class="quote-author">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "QuoteAuthor",
}
</script>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"

.quote-author
  width: 100%
  margin: 0 auto
  padding: 2rem 1rem 1rem 1rem

  font-weight: 600

  display: flex
  flex-direction: column
  width: 100%
  position: relative
  border-top: 1px solid colors.color(lightest-background)

  &::before
    content: "—"
    position: absolute
    left: 0
    top: 0

</style>
