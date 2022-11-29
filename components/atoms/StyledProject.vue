<template>
  <li id="styled-project">
    <slot />
  </li>
</template>

<script lang="ts">
  export default {
    name: "StyledProject",
  }
</script>

<style lang="sass">

@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"


#styled-project
  position: relative
  display: grid
  grid-gap: 10px
  grid-template-columns: repeat(12, 1fr)
  align-items: center

  @media (max-width: 768px)
    @include mixins.box-shadow
  
  &:not(:last-of-type)
    margin-bottom: 100px
    @media (max-width: 768px)
      margin-bottom: 70px
    
    @media (max-width: 480px)
      margin-bottom: 30px
    
  
  &:nth-of-type(odd)
    .project-content
      grid-column: 7 / -1
      text-align: right
      @media (max-width: 1080px)
        grid-column: 5 / -1
    
      @media (max-width: 768px)
        grid-column: 1 / -1
        padding: 40px 40px 30px
        text-align: left
      
      @media (max-width: 480px)
        padding: 25px 25px 20px
      
    
    .project-tech-list
      justify-content: flex-end
      @media (max-width: 768px)
        justify-content: flex-start
      
      li
        margin: 0 0 5px 20px
        @media (max-width: 768px)
          margin: 0 10px 5px 0
        
      
    
    .project-links
      justify-content: flex-end
      margin-left: 0
      margin-right: -10px
      @media (max-width: 768px)
        justify-content: flex-start
        margin-left: -10px
        margin-right: 0
      
    
    .project-image
      grid-column: 1 / 8
      @media (max-width: 768px)
        grid-column: 1 / -1
      
    
  
  .project-content
    position: relative
    grid-column: 1 / 7
    grid-row: 1 / -1
    @media (max-width: 1080px)
      grid-column: 1 / 9
    
    @media (max-width: 768px)
      display: flex
      flex-direction: column
      justify-content: center
      height: 100%
      grid-column: 1 / -1
      padding: 40px 40px 30px
      z-index: 5
    
    @media (max-width: 480px)
      padding: 30px 25px 20px
    
  
  .project-overline
    margin: 10px 0
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: typography.font-size("xs")
    font-weight: 400
  
  .project-title
    color: colors.color("lightest-slate")
    font-size: clamp(24px, 5vw, 28px)
    @media (min-width: 768px)
      margin: 0 0 20px
    
    @media (max-width: 768px)
      color: colors.color("white")
      a
        position: static
        &:before
          content: ''
          display: block
          position: absolute
          z-index: 0
          width: 100%
          height: 100%
          top: 0
          left: 0
        
      
    
  
  .project-description
    @include mixins.box-shadow
    position: relative
    z-index: 2
    padding: 25px
    border-radius: geometry.var("border-radius")
    background-color: colors.color("light-navy")
    color: colors.color("light-slate")
    font-size: typography.font-size("l")
    @media (max-width: 768px)
      padding: 20px 0
      background-color: transparent
      box-shadow: none
      &:hover
        box-shadow: none
      
    
    a
      @include mixins.inline-link
      
    strong
      color: colors.color("white")
      font-weight: normal
    
  
  .project-tech-list 
    display: flex
    flex-wrap: wrap
    position: relative
    z-index: 2
    margin: 25px 0 10px
    padding: 0
    list-style: none
    li
      margin: 0 20px 5px 0
      color: colors.color("light-slate")
      font-family: typography.font("font-mono")
      font-size: typography.font-size("xs")
      white-space: nowrap
    
    @media (max-width: 768px) 
      margin: 10px 0
      li 
        margin: 0 10px 5px 0
        color: colors.color("lightest-slate")
      
    
  
  .project-links 
    display: flex
    align-items: center
    position: relative
    margin-top: 10px
    margin-left: -10px
    color: colors.color("lightest-slate")
    a 
      @include mixins.flex-center
      padding: 10px
      &.external 
        svg 
          width: 22px
          height: 22px
          margin-top: -4px
        
      
      svg 
        width: 20px
        height: 20px
      
    
    .cta 
      @include mixins.small-button
      margin: 10px
    
  
  .project-image
    @include mixins.box-shadow
    grid-column: 6 / -1
    grid-row: 1 / -1
    position: relative
    z-index: 1
    @media (max-width: 768px) 
      grid-column: 1 / -1
      height: 100%
      opacity: 0.25
    
    a 
      width: 100%
      height: 100%
      background-color: colors.color("green")
      border-radius: geometry.var("border-radius")
      vertical-align: middle
      &:hover,
      &:focus 
        background: transparent
        outline: 0
        &:before,
        .img 
          background: transparent
          filter: none
        
      
      &:before 
        content: ''
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 3
        transition: geometry.var("default-transition")
        background-color: colors.color("navy")
        mix-blend-mode: screen
      
    
    .img 
      border-radius: geometry.var("border-radius")
      mix-blend-mode: multiply
      filter: grayscale(100%) contrast(1) brightness(90%)
      @media (max-width: 768px) 
        object-fit: cover
        width: auto
        height: 100%
        filter: grayscale(100%) contrast(1) brightness(50%)

</style>
