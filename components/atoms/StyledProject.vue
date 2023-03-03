<template>
  <li class="styled-project">
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


.styled-project
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
        min-width: 100%
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
        height: 100%
  
  .project-content
    position: relative
    grid-column: 1 / 7
    grid-row: 1 / -1
    z-index: 2
    pointer-events: none

    a
      z-index: 3
      pointer-events: all
      
    @media (max-width: 1080px)
      grid-column: 1 / 9
    
    @media (max-width: 768px)
      display: flex
      flex-direction: column
      justify-content: center
      height: fit-content
      overflow: hidden
      grid-column: 1 / -1
      padding: 40px 40px 30px
    
    @media (max-width: 480px)
      padding: 30px 25px 20px
    
  
  .project-overline
    margin: 10px 0
    color: colors.color("primary-highlight")
    font-family: typography.font("monospace")
    font-size: typography.font-size("xs")
    font-weight: 400
  
  .project-title
    color: colors.color("lightest-foreground")
    font-size: clamp(24px, 5vw, 28px)
    z-index: 2
    position: relative
    pointer-events: none

    @media (min-width: 768px)
      margin: 0 0 20px

    span
      pointer-events: none

    a
      pointer-events: all
    
  
  .project-description
    @include mixins.box-shadow
    position: relative
    padding: 25px
    border-radius: geometry.var("border-radius")
    background-color: colors.color("light-background")
    color: colors.color("light-foreground")
    // font-size: typography.font-size("m")
    z-index: 2
    display: flex
    flex-direction: column

    pointer-events: all

    @media (max-width: 768px)
      padding: 20px 0
      background-color: transparent
      box-shadow: none
      pointer-events: none
      &:hover
        box-shadow: none
      
    
    a
      @include mixins.inline-link
      
    strong
      color: colors.color("white")
      font-weight: normal
    
  
  .project-tech-list 
    @include mixins.small-list-inline

    // add a comma after each list item except the last
    li
      margin-left: 0
      margin: 0 0px 5px 0 !important
      font-weight: 600
      color: colors.color("secondary-highlight")
      
      &:not(:last-of-type)::after 
        content: "/"
        margin-left: 1em
        margin-right: 1em
        color: colors.color("foreground")
  
  .project-links 
    display: flex
    align-items: center
    position: relative
    margin-top: 10px
    margin-left: -10px
    color: colors.color("lightest-foreground")
    z-index: 2
    width: fit-content

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
        stroke-width: 3px
      
    
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
      opacity: 0.5
      
    
    a 
      width: 100%
      height: 100%
      background-color: colors.color("primary-highlight")
      border-radius: geometry.var("border-radius")
      vertical-align: middle

      &:is(:hover,:focus) 
        background: transparent
        outline: 0

        &:is(:before, img) 
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
        z-index: 1
        transition: geometry.var("default-transition")
        background-color: colors.color("background")
        mix-blend-mode: screen
      
    
      .img-project
        border-radius: geometry.var("border-radius")
        mix-blend-mode: multiply
        filter: grayscale(40%) contrast(1) brightness(70%)
        
        @media (max-width: 768px)
          height: 100%
          min-width: 100%
          max-height: 100%

          // crop image to fit container
          object-fit: cover
          object-position: center
          filter: grayscale(100%) contrast(1) brightness(50%)

.project-date
  font-size: 0.8rem
  font-weight: 400
  color: colors.color("primary-highlight")

  margin-top: 2em
  font-family: typography.font("monospace")

  position: relative
  align-self: flex-end
  right: 0
</style>
