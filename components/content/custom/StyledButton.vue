<template>
  <NuxtLink
    class="styled-button"
    :to="href"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
export default {
  name: "StyledButton",
  props: {
    href: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"

.styled-button
  background: colors.color(light-background)
  font-size: typography.font-size(s)
  display: table
  margin-right: auto
  padding: 0 0.5em
  border-radius: 20px

  &:hover
    cursor: pointer
    color: colors.color(lightest-foreground)
</style>
