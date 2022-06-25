<template>
  <div id="main">
    <AppHeader/>
    <!-- <Front/> -->
    <About/>
    <!-- <Jobs/> -->
    <!-- <Featured/> -->
    <!-- <Projects/> -->
    <!-- <Contact/> -->
    <AppFooter/>
  </div>
</template>

<style lang="sass">
  @use "../styles/colors"
  #main
    display: flex
    flex-direction: column
    min-height: 100vh
    $back-color: colors.color("blue")
    @debug $back-color
    background-color: colors.color("green")

  
  .skip-to-content
    position: absolute
    top: 0
    right: 0
    background-color: colors.color("red")
</style>

<script lang="ts">
  export default {
    name: "DefaultLayout",
  }
</script>