<template>
  <header class="header">
    <Logo/>
    <ul class="nav">
      <li class="nav-item">
        <nuxt-link to="/" class="nav-link">home</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/blog" class="nav-link">blog</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/projects/cs" class="nav-link">cs</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/projects/art" class="nav-link">art</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/misc" class="nav-link">misc</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/about" class="nav-link">about</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }

</script>
