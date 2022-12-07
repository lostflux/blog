<template>
  <div class="quote-author">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "QuoteAuthor",
};
</script>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"

.quote-author
  width: 100%
  margin: 0 auto
  padding: 1rem

  color: colors.color("secondary-highlight")
  font-weight: 600
  font-size: typography.font-size("l")

  display: flex
  flex-direction: column
  width: 100%

  ul
    display: inline-flex
    margin: 1em 0 0 0
    color: rgba(colors.color("secondary-highlight"), 0.8)

    li
      width: fit-content
      padding: 0
      margin-right: 0.3em
      font-weight: 400
      font-style: italic
      font-size: 0.8em
      letter-spacing: 0.01rem

      &::before
        content: none

      &:not(:last-child)::after
        content: ','

      &:hover::before
        content: none
</style>
