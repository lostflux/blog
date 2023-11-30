<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 32 32"
    stroke="currentColor"
    strokewidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    class="feather feather-folder"
  >
    <title>Folder</title>
    <path
      fill="none"
      stroke-miterlimit="10"
      stroke-width="2"
      d="M25 28L7 28 7 4 23 4 23 13 25 15z"
    />
    <path
      fill="none"
      stroke-miterlimit="10"
      stroke-width="2"
      d="M23 4L27 4 27 13 25 15"
    />
  </svg>
</template>

<script lang="ts">
export default {
  name: "FolderIcon",
}
</script>

<style lang="sass" scoped>
  @use "@/styles/colors"
  svg
    fill: none

    &:hover
      fill: colors.color("primary-highlight")
</style>
