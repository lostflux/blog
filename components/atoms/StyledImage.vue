<template>
  <div id="styled-image">
    <div id="wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "StyledImage",
  }
</script>

<style lang="sass">
  @use "../styles/typography"
  @use "../styles/colors"
  @use "../styles/geometry"

  #styled-image
    position: relative
    max-width: 300px
    @media (max-width: 768px)
      margin: 50px auto 0
      width: 70%
    
    #wrapper 
      @apply mixins.box-shadow
      display: block
      position: relative
      width: 100%
      border-radius: geometry.var("border-radius")
      background-color: colors.color("green")
      &:hover,
      &:focus 
        outline: 0
        &:after 
          top: 15px
          left: 15px
        
        img 
          filter: none
          mix-blend-mode: normal
        
      
      img 
        position: relative
        border-radius: geometry.var("border-radius")
        mix-blend-mode: grayscale(100%)
        filter: grayscale(100%) contrast(1)
        transition: geometry.var("transition")
      
      &:before, &:after 
        content: ''
        display: block
        position: absolute
        width: 100%
        height: 100%
        border-radius: geometry.var("border-radius")
        transition: geometry.default-transition()
      
      &:before 
        top: 0
        left: 0
        background-color: colors.color("navy")
        mix-blend-mode: screen
      
      &:after 
        border: 2px solid colors.color("green")
        top: 20px
        left: 20px
        z-index: -1
</style>
