<template>
  <NuxtLayout name="default">
    <section class="not-found">
      <div class="container">
        <div class="error-code">
          404
        </div>
        <p class="error-message">
          This page does not exist.
        </p>
      </div>
    </section>
    <RouterButtons />
  </NuxtLayout>
</template>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

section.not-found
  display: flex
  min-height: 100%

.container
  display: inline-flex
  margin: auto

  .error-code
    font-size: 24px
    font-weight: 600
    margin: auto
    color: colors.color(dark-foreground)
    height: 2em
    line-height: 2em
    padding-right: 20px
    margin-right: 20px
    border-right: 1px solid colors.color(dark-foreground)

  .error-message
    color: colors.color(foreground)
    line-height: 5rem
</style>
