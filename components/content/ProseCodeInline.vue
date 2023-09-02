<template>
  <code><slot /></code>
</template>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"

code
  background: colors.color("light-background")
  padding: 0.2em 0.4em
  border-radius: 0.4em
  font-size: typography.font-size("s")
  color: colors.color(lightest-foreground)
</style>
