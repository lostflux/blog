<template>
  <main class="fill-height">
    <Hero id="landing"/>
    <About id="about"/>
    <Jobs id="jobs"/>
    <Featured id="projects"/>
    <Projects />
    <Contact id="contact"/>
  </main>
</template>

<!-- <style lang="sass">
  @use '../styles/index'
</style> -->

<script lang="ts">
export default {
  name: "Landing Page",

  data() {
    return {
      title: "Altair's Portfolio",
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "landing-page",
          name: "Landing Page",
          content: "A summary of my work and experience."
        }
      ]
    }
  }
}
</script>

