<template>
  <div class="expand-icon">
    <!-- <svg
      aria-hidden="true"
      role="img"
      class="collapse"
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 7.59L7.05 2.64L5.64 4.05L12 10.41l6.36-6.36l-1.41-1.41L12 7.59zM5.64
            19.95l1.41 1.41L12 16.41l4.95 4.95l1.41-1.41L12 13.59l-6.36 6.36z"
      />
    </svg>

    <svg
      aria-hidden="true"
      role="img"
      class="expand"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path
        fill="currentColor"
        d="m12 19.24l-4.95-4.95l-1.41 1.42L12 22.07l6.36-6.36l-1.41-1.42L12
            19.24zM5.64 8.29l1.41 1.42L12 4.76l4.95 4.95l1.41-1.42L12 1.93L5.64 8.29z"
      />
    </svg> -->
  </div>
</template>

<script lang="ts">
export default {
  name: "ExpandIcon",
};
</script>

<style lang="sass">
@use "@/styles/colors"

.expand-icon
  width: 2.5ch
  aspect-ratio: 1/1
  display: flex
  place-items: center
  position: relative
  line-height: 1.5
  font-size: 1.2em
  align-self: right
  justify-self: center

  &::before
    transition: all 0.3s ease-in-out
    content: "\232A"
    width: 0.6ch
    font-weight: 700
    transform: rotate(90deg)
    display: flex
    position: absolute
    left: 30%

  &.expanded::before
    transform: rotate(270deg)

</style>
