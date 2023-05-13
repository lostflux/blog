<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
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
    />
  </svg>
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
};
</script>
