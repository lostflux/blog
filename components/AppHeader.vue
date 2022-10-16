<template>
  <header class="header">
    <nav class="nav">
      <ol class="nav-list">
        <Logo class="logo"/>
        <Nav/>
      </ol>
    </nav>
    
  </header>
</template>

<script lang="ts" setup>
  const test = 0;
  </script>
  <script lang="ts">
  export default {
    name: "AppHeader",
  };
</script>

<style lang="sass" scoped>
@use "../styles/header"
</style>
