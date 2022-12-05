<template>
  <section class="jobs-section">
    <slot />
  </section>
</template>

<style lang="sass">
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"

.jobs-section
  max-width: 700px

  .inner
    display: flex
    width: 700px

    @media (max-width: 900px)
      width: 100%
    
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
