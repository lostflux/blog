<template>
  <div class="fill-height">
    <div id="hero">
      <h1> Hi, my name is </h1>
      <h2> Altair </h2>
      <h3> I build things for the web</h3>
      <p>
        I am a software engineer and student at Dartmouth College.
        I am passionate about building the next important solutions
        using emerging technologies such as Machine Learning and Blockchain.
      </p>
      <a
        class="email-link"
        href="mailto:amittaijoel@outlook.com"
        target="_blank"
        rel="noreferrer">
        Up for a chat?
      </a>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"

#hero
  @include mixins.flex-center
  flex-direction: column
  align-items: flex-start
  min-height: 100vh
  padding: 0

  @media (max-width: 480px) and (min-height: 700px)
    padding-bottom: 10vh

  h1
    margin: 0 0 30px 4px
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: clamp(typography.font-size("s"), 5vw, typography.font-size("m"))
    font-weight: 400
    @media (max-width: 480px)
      margin: 0 0 20px 2px
    
  h3
    margin-top: 10px
    color: colors.color("slate")
    line-height: 0.9
    font-family: typography.font("font-sans")
  
  p 
    margin: 20px 0 0
    max-width: 540px
    font-family: typography.font("font-sans")
  
  .email-link
    // @include mixins.big-button
    margin-top: 50px
  
</style>
