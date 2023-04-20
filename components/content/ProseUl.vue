<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "~/styles/mixins"
.prose-ul
  @include mixins.styled-list
  margin-left: 0.5em
  font-size: 1em
  // margin: 0.5em 0 0.5em 0.5em

</style>
