<template>
  <main class="fill-height">
    <!-- <Head /> -->
    <Hero id="landing" />
    <About id="about" />
    <Jobs id="jobs" />
    <Featured id="projects" />
    <Projects />
    <Contact id="contact" />
  </main>
</template>

<!-- <style lang="sass">
  @use '../styles/index'
</style> -->

<script setup lang="ts">

// definePageMeta({
//   documentDriven: true
//   // {
//     // page: false,
//     // surround: false,
//     // layout: "default",
//   // }
// })

</script>

<script lang="ts">
export default {
  name: "Landing Page",
  layout: "default",
  // data() {
  //   return {
  //     title: "Altair's Portfolio",
  //   }
  // },
  head: {
    title: "Altair's Portfolio",
    meta: [
      {
        hid: "landing-page",
        name: "Landing Page",
        content: "A summary of my work and experience.",
      },
    ],
  },
};
</script>
