<template>
  <div class="styled-text">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledText",
};
</script>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

.styled-text
  font-family: typography.font("sans-serif")

  ul
    @include mixins.styled-list

  a
    @include mixins.inline-link

</style>
