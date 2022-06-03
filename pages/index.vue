<template>
  <div id="main" location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </div>
</template>

<script lang="ts">

  export default {
    head() {
      return {
        title: "Amittai's Portfolio",
        meta: [
          {
            name: "Amittai's Portfolio",
            content: "Randomness",
          },
        ],
      }
    }
  }
</script>

<style lang="sass" scoped>

  .styled-main
    counter-reset: section
</style>
