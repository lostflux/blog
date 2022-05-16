<template>
  <div class="container">
    <AppHeader/>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import AppHeader from "../components/AppHeader.vue"

export default {
  components: {
    AppHeader
  },
  layout: 'default'
}
</script>


<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Aktiv Grotesk", 'Courier New', Courier, monospace;
    font-size: 1rem;
    line-height: 1.5;
    background: #f4f4f4;

  }

  a {
    color: crimson;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .container {
    max-width: 800px;
    margin: 2rem auto;
    overflow: hidden;
    padding: 1rem 2rem;
    background: #fff;
  }
</style>
