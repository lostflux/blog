<template>
  <header class="header">
    <nav class="nav">
      <ol class="nav-list">
        <Logo class="logo"/>
        <li class="nav-item">
          <NuxtLink to="/" class="nav-link">home {{ test }} </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/blog" class="nav-link">blog</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/projects/cs" class="nav-link">cs</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/projects/art" class="nav-link">art</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/misc" class="nav-link">misc</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/about" class="nav-link">about</NuxtLink>
        </li>
      </ol>
    </nav>
    
  </header>
</template>

<script setup>
const test = 0;
</script>
<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="sass" scoped>
@use "../styles/header"
</style>
