<template>
  <section id="about-section">
    <h2 class="numbered-heading">About Me</h2>
    <div class="inner">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "StyledAboutSection",
}
</script>

<style lang="sass" scoped>
  @use "../styles/typography"
  @use "../styles/colors"
  @use "../styles/geometry"

  #about-section
    max-width: 900px
    .inner
      display: grid
      grid-template-columns: 3fr 2fr
      grid-gap: 50px
      @media (max-width: 768px) 
        display: block
</style>

