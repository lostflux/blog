<template>
  <ContentDoc
    path="profile/contact"
    query="{ category: 'contact' }"
  />
</template>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/typography"
@use "~/styles/colors"

.contact-section
  max-width: 600px
  margin: 0 auto 100px
  text-align: center
  @media (max-width: 768px) 
    margin: 0 auto 50px
  
  .overline 
    display: block
    margin-bottom: 20px
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: typography.font-size("m")
    font-weight: 400
    &:before 
      bottom: 0
      font-size: typography.font-size("s")
    
    &:after 
      display: none
    
  
  .title 
    font-size: clamp(40px, 5vw, 60px)
  
  .email-link
    @include mixins.big-button
    margin-top: 50px
  
</style>
