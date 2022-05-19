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
        <nuxt-link to="/about">about</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }

</script>

<style lang="sass">

  .header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1rem
    padding-bottom: 1rem
    border-bottom: 1px solid #eee

    .title
      font-size: 3rem
      color: crimson

    ul
      display: flex

  a
    display: inline-block
    background: #333
    color: #fff
    padding: 0.3rem 1rem
    margin-right: 0.5rem

</style>
