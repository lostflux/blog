<template>
  <nav class="nav">
    <div class="nav-grid">
      <div class="nav-row">
        <div class="nav-column">
          <NuxtLink to="/" class="nav-column-header">Home</NuxtLink>
          <NuxtLink to="/About" class="nav-column-item">About</NuxtLink>
          <NuxtLink to="/Misc" class="nav-column-item">Misc</NuxtLink>
        </div>
        <div class="nav-column">
          <NuxtLink to="/Projects" class="nav-column-header">Projects</NuxtLink>
          <NuxtLink to="/Projects/1" class="nav-column-item">Data</NuxtLink>
          <NuxtLink to="/Projects/2" class="nav-column-item">Systems</NuxtLink>
          <NuxtLink to="/Projects/misc" class="nav-column-item">Misc</NuxtLink>
        </div>
        <div class="nav-column">
          <NuxtLink to="/Research" class="nav-column-header">Research</NuxtLink>
          <NuxtLink to="/Research/1" class="nav-column-item">Publications</NuxtLink>
          <NuxtLink to="/Research/2" class="nav-column-item">Notes</NuxtLink>
        </div>
        <div class="nav-column">
          <NuxtLink to="/Blog" class="nav-column-header">Blog</NuxtLink>
          <NuxtLink to="/Blog/1" class="nav-column-item">Functional Programming</NuxtLink>
          <NuxtLink to="/Blog/2" class="nav-column-item">Low-Level Programming</NuxtLink>
          <NuxtLink to="/Blog/3" class="nav-column-item">Data Infrastructure</NuxtLink>
          <NuxtLink to="/Blog/4" class="nav-column-item">Deep Learning</NuxtLink>
        </div>
        <div class="nav-column">
          <NuxtLink to="/Blog/Photography" class="nav-column-header">Photography</NuxtLink>
          <NuxtLink to="/Blog/Photography/0" class="nav-column-item">Abstract</NuxtLink>
          <NuxtLink to="/Blog/Photography/3" class="nav-column-item">LandScape</NuxtLink>
          <NuxtLink to="/Blog/Photography/1" class="nav-column-item">Miniature</NuxtLink>
          <NuxtLink to="/Blog/Photography/2" class="nav-column-item">Portraits</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
  export default {
    name: "Nav",
  }
</script>

<style lang="sass" scoped>
  @use "../styles/header"

  // make nav-row horizontal
  .nav-row
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: top

  // make nav-column-items a vertical list
  .nav-column
    align-items: right
    margin-bottom: 1rem
    display: table-column
    &:hover
      background-color: #f5f5f5
      border-radius: 0.25rem
      padding: 0.5rem
      transition: all 0.2s ease-in-out

  .nav-column-header
    font-size: 1.5rem
    font-weight: 600
    color: #000
    text-decoration: none
    &:hover
      color: #000
      text-decoration: none

  .nav-column-item
    font-size: 1.25rem
    font-weight: 400
    color: #000
    text-decoration: none
    display: none
    &:hover
      color: #000
      text-decoration: none

</style>
