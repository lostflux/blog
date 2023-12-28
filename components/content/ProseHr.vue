<template>
  <hr class="prose-hr">
</template>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/mixins"

.prose-hr
  background-color: colors.color(light-background)
  height: 1px
  border-width: 0px
  margin: 1rem 0
  
  @include mixins.shift-left
</style>
