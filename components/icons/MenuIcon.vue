<template>
  <div
    :class="{
      'wrapper-menu': true,
      'open': open
    }"
    @click="open = !open"
  >
    <!-- <div class="line-menu half start"></div> -->
    <!-- <div class="line-menu"></div> -->
    <!-- <div class="line-menu half end"></div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: "MenuIcon",
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="sass" scoped>

@use "~/styles/colors"

*
  box-sizing: border-box
  min-width: 10px

.wrapper-menu
  min-width: 30px  // 50px
  width: 100%
  aspect-ratio: 1/1
  display: flex
  flex-direction: column
  justify-content: space-between
  cursor: pointer
  transition: transform 330ms ease-out

.wrapper-menu.open
  transform: rotate(-45deg)

.line-menu
  background-color: inherit
  border-radius: 1px
  width: 100%
  height: 2px

  // & .half
  //   width: 50%

.line-menu.start
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)
  transform-origin: right

.open .line-menu.start
  transform: rotate(-90deg) translateX(2px)

.line-menu.end
  align-self: flex-end
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)
  transform-origin: left

.open .line-menu.end
  transform: rotate(-90deg) translateX(-2px)

</style>
