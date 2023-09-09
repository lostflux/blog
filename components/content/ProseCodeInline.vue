<template>
  <code><slot /></code>
</template>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"

code
  background: colors.color("light-background")
  padding: 0 0.3em 0.1em
  border-radius: 0.2em
  font-size: typography.font-size("s")
  color: colors.color(lightest-foreground)
</style>
