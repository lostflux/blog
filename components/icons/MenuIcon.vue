<template>
  <div class="wrapper-menu">
    <div class="line-menu half start"></div>
    <div class="line-menu"></div>
    <div class="line-menu half end"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MenuIcon",
  mounted: function () {
    const wrapperMenu = document.querySelector('.wrapper-menu');
  
    wrapperMenu.addEventListener('click', function(){
      wrapperMenu.classList.toggle('open');  
    });
  },
}
</script>






<style lang="sass" scoped>

@use "~/styles/colors"

*
  box-sizing: border-box
  min-width: 10px

html, body
  margin: 0
  padding: 0
  height: 100%

body
  background-color: colors.color("green")
  display: flex
  justify-content: center
  align-items: center

.wrapper-menu
  width: 30px  // 50px
  height: 30px // 50px
  display: flex
  flex-direction: column
  justify-content: space-between
  cursor: pointer
  transition: transform 330ms ease-out

  // background-color: yellow
  margin-top: 25px

.wrapper-menu.open
  transform: rotate(-45deg)  

.line-menu
  background-color: colors.color("green")
  border-radius: 1px
  width: 100%
  height: 2px

.line-menu.half
  width: 50%

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
