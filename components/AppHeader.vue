<template>
  <header class="header">
    <h1 class="title">Amittai's Page</h1>
    <ul class="nav">
      <li class="nav-item">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/AboutMe">About Me</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }

</script>

<style>

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .header .title {
    font-size: 3rem;
    color: crimson
  }

  .header ul {
    display: flex;
  }

  .header a {
    display: inline-block;
    background: #333;
    color: #fff;
    padding: 0.3rem 1rem;
    margin-right: 0.5rem;
  } 
</style>
