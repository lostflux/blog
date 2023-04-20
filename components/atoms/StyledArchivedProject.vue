<template>
  <li class="styled-archived-list-item">
    <slot />
  </li>
</template>

<script lang="ts">

export default {
  name: "StyledArchivedProject",
};

</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"

.styled-archived-list-item
  position: relative
  cursor: default
  transition: geometry.var("default-transition")

  @media (prefers-reduced-motion: no-preference)
    &:is(:hover, :focus-within, .project-inner)
      transform: translateY(-7px)

  a
    position: relative
    z-index: 1

  .project-inner
    @include mixins.box-shadow
    @include mixins.flex-between
    flex-direction: column
    align-items: flex-start
    position: relative
    height: 100%
    padding: 2rem 1.75rem
    border-radius: geometry.var("border-radius")
    background-color: colors.color("light-background")
    transition: geometry.var("default-transition")
    overflow: none

  .project-top
    @include mixins.flex-between
    margin-bottom: 35px

    .folder
      color: colors.color("primary-highlight")
      svg
        width: 40px
        height: 40px

    .project-links
      display: flex
      align-items: center
      margin-right: -10px
      color: colors.color("light-slate")

      a
        @include mixins.flex-center
        padding: 5px 7px

        &.external

          svg
            width: 22px
            height: 22px
            margin-top: -4px

        svg
          width: 20px
          height: 20px

  .project-title
    margin: 0 0 10px
    color: colors.color("lightest-slate")
    font-size: typography.font-size("xxl")
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
    color: colors.color("light-slate")
    font-size: 17px

    a
      @include mixins.inline-link

  .project-tech-list
    @include mixins.small-list-inline

    li
      margin-left: 0
      margin: 0 0px 5px 0
      font-weight: 600

      color: colors.color("secondary-highlight")

      &:not(:last-of-type)::after
        content: "/"
        margin-left: 1em
        margin-right: 1em
        color: colors.color("foreground")

</style>
