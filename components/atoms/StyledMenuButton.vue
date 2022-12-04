<template>
  <!-- <button class="menu-button"> -->
    <!-- {{ menuOpen ? "&#x3e" : "&#x3c" }} -->
    <div class="menu-button-container">
      <Icon type="menu" class="menu-button" />
    </div>
</template>

<script lang="ts">

  export default  {
    name: "StyledMenuButton",
    data() {
      return {
        menuOpen: false,
      }
    },
    methods: {
      toggle() {
        this.menuOpen = !this.menuOpen;
      },
    },
  }
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/geometry"
@use "~/styles/colors"
@use "../styles/typography"

.menu-button-container
  position: absolute
  right: 0
  width: 64px
  height: 64px
  display: flex
  // justify-content: center
  align-items: center
  z-index: 19

.menu-button
  position: relative
  margin: 10px 0
  margin-left: auto
  margin-right: 0
  max-height: 70%
  max-width: 70%
  border: 0
  background: transparent
  color: inherit
  text-transform: none
  transition-duration: 0.15s
  z-index: 20
  

  // &:hover
  //   color: red

  .ham-box
    display: inline-block
    position: relative
    width: geometry.var("hamburger-width")
    height: 24px

  .ham-box-inner 
    position: absolute
    top: 50%
    right: 0
    width: geometry.var("hamburger-width")
    height: 2px
    border-radius: geometry.var("border-radius")
    background-color: colors.color("green")
    transition-duration: 0.22s
    transition-property: transform

    &:before, &:after 
      content: ''
      display: block
      position: absolute
      left: auto
      right: 0
      width: geometry.var("hamburger-width")
      height: 2px
      border-radius: 4px
      background-color: colors.color("green")
      transition-timing-function: ease
      transition-duration: 0.15s
      transition-property: transform


  .ham-box-inner .menu-open
    transition-delay: 0.12s
    transform: rotate(225deg)
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)

    &:before
      width: 100%
      top: 0
      opacity: 0
      transition: geometry.var("ham-before-active")

    &:after
      width: 100%
      bottom: 0
      transform:  rotate(-90deg)
      transition: geometry.var("ham-after-active")

  .ham-box-inner .menu-closed

    transition-delay: 0s
    transform: rotate(0deg)
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19)

    &:before
      width: 120%
      top: -10px
      opacity: 1
      transition: geometry.var("ham-before")

    &:after
      width: 80%
      bottom: -10px
      transform:  rotate(0)
      transition: geometry.var("ham after")
    
</style>
