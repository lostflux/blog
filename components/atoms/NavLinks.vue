<template>
  <div class="nav-links">
    <ol>
      <li>
        <NuxtLink to="#About" class="nav-link">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#Experience" class="nav-link">Experience</NuxtLink>
      </li>
      <li class="nav-column">
        <NuxtLink to="#Work" class="nav-link">Work</NuxtLink>
      </li>
      <li class="nav-column">
        <NuxtLink to="#Contact" class="nav-link">Contact</NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
  export default {
    name: "NavLinks",
  }
</script>

<style lang="sass" scoped>
  @use "~/styles/colors"
  @use "~/styles/typography"
  @use "~/styles/geometry"
  @use "~/styles/mixins"
  .nav-links
    display: flex
    align-items: center

    @media (max-width: 768px)
      display: none
    
    ol
      @apply mixins.flex-between
      padding: 0
      margin: 0
      list-style: none

      li
        margin: 0 5px
        position: relative
        counter-increment: item 1
        font-size: typography.font-size("xs")
        float: left

        .nav-link
          padding: 10px
          font-family: typography.font("font-mono")
          font-size: typography.font-size("xs")
          
          &:before
            content: '0' counter(item) '.'
            margin-right: 5px
            color: colors.color("green")
            font-size: typography.font-size("xxs")
            text-align: right
</style>
