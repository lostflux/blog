<template>
  <div id="styled-image">
    <div class="wrapper">
      <img
        src="~assets/images/profile-image.jpg"
        class="img"
        width="500"
        quality="100"
        formats="AUTO, WEBP, AVIF"
        alt="head shot"
        loading="lazy"
      >
      <!-- <slot /> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "StyledImage",
};
</script>

<style lang="sass">

@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"
@use "../styles/mixins"

#styled-image
  position: relative
  width: clamp(200px, 50%, 280px)
  padding: 10px 30px 30px 10px
  float: right

  // @media (max-width: 768px)
  //   margin: 50px auto 0 auto
  //   width: 70%

  .wrapper
    @include mixins.box-shadow
    display: block
    position: relative
    width: 100%
    border-radius: geometry.var("border-radius")
    // background-color: colors.color("primary-highlight")

    &:hover, &:focus
      outline: 0

      &:after
        top: 10px
        left: 10px

      .img
        filter: grayscale(30%) contrast(1)
        mix-blend-mode: normal

    .img
      position: relative
      border-radius: geometry.var("border-radius")
      mix-blend-mode: grayscale(100%)
      filter: grayscale(70%) contrast(1)
      transition: geometry.var("default-transition")
      z-index: 2

    &:before, &:after
      content: ''
      display: block
      position: absolute
      width: 100%
      height: 100%
      border-radius: geometry.var("border-radius")
      transition: geometry.var("default-transition")

    &:before
      top: 0
      left: 0
      background-color: colors.color("background")
      mix-blend-mode: screen

    &:after
      border: 2px solid colors.color("primary-highlight")
      top: 20px
      left: 20px
      z-index: 1
</style>
