<template>
  <div class="comment-icon-internal-wrapper">
    <svg
      viewBox="0 0 50 50"
      enable-background="new 0 0 50 50"
      class="comment-icon-svg"
    >
      <title>Comment</title>
      <path
        fill="currentColor"
        d="M9.4 4.2h31.2c8.6 0 9.4 7 9.4 15.6s-.7 15.6-9.4 15.6h-2.2l-.9 9.4-18.8-9.4H9.4c-8.6
        0-9.4-7-9.4-15.6S.7 4.2 9.4 4.2z"
      />
    </svg>
  </div>
</template>
<script lang="ts">
export default {
  name: "CommentIcon",
};
</script>
<style lang="sass">
@use "@/styles/colors"

.comment-icon-internal-wrapper
  width: 20px
  aspect-ratio: 1/1
  transition: color 0.3s ease-in-out

  &:hover
    color: red
</style>
