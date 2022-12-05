<template>
  <div id="root">
    <AppHeader/>
    <body>
      <main>
        <a class="skip-to-content" href="#content"/>
        <!-- <body> -->
          <slot id="content"/>

      </main>
    </body>
    <!-- <Head /> -->
    <!-- </body> -->
    <AppFooter/>
  </div>
</template>

<style lang="sass">
// @use "../styles/default"
</style>

<!-- <script lang="ts">
  export default {
    name: "DefaultLayout",
    props: {
      title: {
        type: String,
        default: "Default Layout"
      },
      children: {
        type: Object,
        default: null
      }
    }
  }
</script> -->

<!-- <script setup lang="ts">



</script> -->
