<template>
  <section class="hero">
    <ContentDoc
      path="profile/hero"
      tag="div"
      class="hero-container"
    />
  </section>
</template>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"

.hero
  @include mixins.flex-center
  flex-direction: column
  align-items: flex-start
  min-height: 100vh
  padding: 0
  // position: static

  @media (max-width: 480px) and (min-height: 700px)
    padding-bottom: 10vh

  h1
    margin: 0 0 30px 4px
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: clamp(typography.font-size("s"), 5vw, typography.font-size("m"))
    font-weight: 400

    @media (max-width: 480px)
      margin: 0 0 20px 2px
    
  h3
    margin-top: 10px
    color: colors.color("slate")
    line-height: 0.9

  .big-heading
    font-weight: 600
  
  p p
    margin: 20px 0 0
    max-width: 540px
  
  .email-link
    @include mixins.big-button

    p
      font-family: typography.font("font-mono")
      font-size: typography.font-size("s")
      font-weight: 600

      &:hover, &:focus, &:active
        color: colors.color("green")
</style>
