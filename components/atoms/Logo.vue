<template>
  <div class="logo" tabindex="-1">
    <NuxtLink  class="logo-link" to="/" aria-label="home">
      <Icon type="logo" class="raw-logo"/>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "Logo"
  }
</script>

<style lang="sass">

@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"

.logo
  @include mixins.flex-center
  width: 40px
  height: 40px
  margin-right: 5px
  // background-color: colors.color("green")

  .logo
    color: colors.color("green")
    width: 42px
    height: 42px

</style>
