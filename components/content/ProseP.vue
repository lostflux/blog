<template>
  <p class="paragraph">
    <slot />
  </p>
</template>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

.paragraph
  font-family: typography.font("sans-serif")
  // font-size: typography.font-size("m")
  // line-height: 1.7
  color: colors.color("foreground")
</style>
