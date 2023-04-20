<template>
  <section class="projects-section">
    <slot />
  </section>
</template>

<script lang="ts">
export default {
  name: "StyledArchivedProjectsSection",
};
</script>

<style lang="sass">

@use "~/styles/mixins"
@use "~/styles/typography"

.projects-section
  display: flex
  flex-direction: column
  align-items: center

  h2
    font-size: clamp(24px, 5vw, typography.font-size("heading"))

  .archive-link
    font-family: typography.font("monospace")
    font-size: typography.font-size("s")

    &:after
      bottom: 0.1em
      content: " →"

  .projects-grid
    @include mixins.reset-list
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

    grid-gap: 15px
    position: relative
    margin-top: 50px

    @media (max-width: 1080px)
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

  .more-button
    margin: 80px auto 0

</style>
