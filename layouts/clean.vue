<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  >
  <div class="container">
    <h1> clean</h1>
    <slot />
  </div>
</template>

<style lang="sass">
@use "~/styles/default"

.container
  max-width: 1000px
  margin: 0 auto
  background-color: white !important
  margin: 100vh
</style>
