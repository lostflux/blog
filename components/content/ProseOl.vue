<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<style lang="sass">

.prose-ol
  counter-reset: ol-count

  & > li
    counter-increment: ol-count
    position: relative
    padding-left: 1.5em
    margin-bottom: 0.7em

    &::before
      content: counter(ol-count) '.'
      position: absolute
      left: 0
</style>
