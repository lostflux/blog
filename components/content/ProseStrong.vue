<template>
  <strong class="prose-strong">
    <slot />
  </strong>
</template>
<style lang="sass" scoped>
@use "@/styles/colors"
.prose-strong
  font-weight: 500
  color: colors.color(lightest-foreground)
</style>
