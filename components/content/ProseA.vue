<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
  fancy: {
    type: Boolean,
    default: false,
  },
  external: {
    type: Boolean,
    default: false,
  },
  // blank: {
  //   type: Boolean,
  //   default: false,
  // },
  forced: {
    type: Boolean,
    default: false,
  },
  bare: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span
    :class="{
      'link-wrapper': true,
      'fancy': fancy,
      'inactive': !(to || href) && !forced
    }"
  >
    <NuxtLink
      :href="to || href"
      :class="{
        'link': true,
        'underline': !bare,
        'arrow': fancy
      }"
      :target="external ? '_blank' : ''"
    >
      <span class="link-text">
        <slot />
      </span>
    </NuxtLink>
    <svg
      v-if="fancy"
      class="pointer"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5
            4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8
            8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645
            8.64645C2.45118 8.84171 2.45118 9.15829 2.64645
            9.35355C2.84171 9.54882 3.15829 9.54882 3.35355
            9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8
            3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645
            8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
      />
    </svg>
  </span>
</template>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"

.link-wrapper
  align-items: center
  gap: 7px
  display: inline
  color: current-color

  .link
    color: colors.color(lightest-foreground)
    margin: 0
    padding: 0
    line-height: 0.9em
    display: inline

    .link-text
      font-family: typography.font("sans-serif"), sans-serif !important

    &:not(:last-child)
      margin-right: 3px

    &.underline:not(.router-link-active)

      & > span
        border-bottom: 1px dashed rgba(colors.color(lightest-foreground), 0.7)

      &:hover > span
        border-bottom: 1px solid

    &.router-link-active
      color: colors.color(yellow)

      *
        font-size: 11px !important

  .pointer
    height: 1em
    aspect-ratio: 1/1 !important
    display: inline
    width: 1em
    fill: currentcolor

  &.inactive

    .link
      color: colors.color(dark-foreground) !important

      &:hover
        .link-text
          border-bottom-color: transparent
          cursor: not-allowed !important

    .pointer
      color: colors.color(dark-foreground) !important

</style>
