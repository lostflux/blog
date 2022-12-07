<template>
  <div id="root">
    <AppHeader/>
    <body>
      <main>
        <a class="skip-to-content" href="#content"/>
        <!-- <body> -->
          <div class="container">
            <slot id="content"/>
          </div>
          <!-- <slot id="content"/> -->
      </main>
    </body>
    <AppFooter/>
  </div>
</template>

<style lang="sass">
@use "../styles/default"

.container
  max-width: 1000px
  margin: 0 auto
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
