<template>
  <section id="jobs-section">
    <slot />
  </section>
</template>

<style lang="sass">
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"

#jobs-section
  max-width: 700px
  .inner
    display: flex
    @media (max-width: 600px)
      display: block
    
    // Prevent container from jumping
    @media (min-width: 700px)
      min-height: 340px

</style>

<script lang="ts">
export default {
  name: "StyledJobsSection",
}
</script>
