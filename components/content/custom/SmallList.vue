<template>
  <div class="small-list">
    <slot />
  </div>
</template>

<script lang="ts">
  export default {
    name: "SmallList",
  }
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/typography"

.small-list
  @include mixins.small-list
  display: block
  max-width: 100%
  font-size: inherit

  &.columned
    -webkit-columns: 2
    -moz-columns: 2
    -ms-grid-columns: 2
    columns: 2


    grid-template-columns: repeat(2, minmax(140px, 200px))
    grid-gap: 1em
</style>
