<template>
  <svg
    viewBox="0 0 50 50"
    fill="none"
    stroke-width="1"
    xmlns="http://www.w3.org/2000/svg"
    :class="{
      'bookmark-icon-svg': true,
      'active': active,
    }"
  >
    <!-- <path
      v-if="active"
      d="M10.5 10.5L11.5 11.5L14 9M8.25 5H15.75C16.4404 5 17 5.58763 17 6.3125V19L12 15.5L7 19V6.3125C7 5.58763 7.55964 5 8.25 5Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
    />
    <path
      v-else
      d="M10 10.5H14M12 8.5V12.5M8.25 5H15.75C16.4404 5 17 5.58763 17 6.3125V19L12 15.5L7 19V6.3125C7 5.58763 7.55964 5 8.25 5Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
    /> -->
    <path
      fill="currentColor"
      d="M2.1 0h45.8v50L25.5 37.5 2.1 50V0z"
    />
  </svg>
  <!-- <svg
    class="icon"
    viewBox="0 0 50 50"
    enable-background="new 0 0 50 50"
  ><title>Save Article</title><path
    fill="currentColor"
    d="M2.1 0h45.8v50L25.5 37.5 2.1 50V0z"
  /></svg> -->
</template>

<script lang="ts">
export default {
  name: "BookMarkIcon",

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" scoped>
@use "@/styles/colors"

.bookmark-icon-svg
  height: 15px !important
  aspect-ratio: 1/1 !important
  color: colors.color(foreground)

  &.active
    color: red
</style>
