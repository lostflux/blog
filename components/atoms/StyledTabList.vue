<template>
  <div class="styled-tab-list">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledTabList",
}
</script>

<style lang="sass">

.styled-tab-list
  position: relative
  z-index: 3
  width: max-content
  padding: 0
  margin: 0
  list-style: none
  @media (max-width: 600px)
    display: flex
    overflow-x: auto
    width: calc(100% + 100px)
    padding-left: 50px
    margin-left: -50px
    margin-bottom: 30px

  @media (max-width: 480px)
    width: calc(100% + 50px)
    padding-left: 25px
    margin-left: -25px

  li
    &:first-of-type
      @media (max-width: 600px)
        margin-left: 50px

      @media (max-width: 480px)
        margin-left: 25px


    &:last-of-type
      @media (max-width: 600px)
        padding-right: 50px

      @media (max-width: 480px)
        padding-right: 25px

</style>
