<template>
  <div id="main">
    <AppHeader class=""/>
    <slot />
    <AppFooter/>
  </div>
</template>

<style lang="sass">
  @use "../styles/default"
</style>

<script lang="ts">
  export default {
    name: "DefaultLayout",
  }
</script>
