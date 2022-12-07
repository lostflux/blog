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
  margin-bottom: 1em
  line-height: 1.7rem
  margin: 0 0 1.5em 0
</style>
