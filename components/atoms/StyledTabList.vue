<template>
  <div class="styled-tab-list">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledTabList",
};
</script>

<style lang="sass">

.styled-tab-list
  position: relative
  width: max-content
  padding: 0
  margin: 0
  list-style: none
  @media (max-width: 600px)
    display: flex
    overflow-x: auto
    width: auto
    margin-bottom: 30px

  @media (max-width: 480px)
    width: auto

</style>
