<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style lang="sass" scoped>
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

.prose-p
  font-family: typography.font("sans-serif")
  font-size: typography.font-size("m")
  line-height: 1.7
  // color: colors.color("foreground")
</style>
