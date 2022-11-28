<template>
  <div class="styled-menu">

  </div>
</template>

<style lang="sass">
@use "../styles/colors"

.styled-menu
  display: none

  @media(maxwidth: 768px)
    display: block

</style>

<script lang="ts">

export default {
  name: "StyledMenu",
}

</script>
