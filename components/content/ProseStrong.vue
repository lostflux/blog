<template>
  <strong class="prose-strong">
    <slot />
  </strong>
</template>
<style lang="sass" scoped>
@use "@/styles/colors"
.prose-strong
  font-weight: 400
  color: colors.color(lightest-foreground)
</style>
