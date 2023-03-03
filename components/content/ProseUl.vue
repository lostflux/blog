<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/typography"
.prose-ul
  @include mixins.styled-list
  // font-size: typography.font-size("xs")

</style>
