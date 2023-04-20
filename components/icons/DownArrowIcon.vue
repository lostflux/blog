<template>
  <svg
    id="down-arrow"
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="down-arrow"
  >
    <path
      id="primary"
      d="M12,3V21M9,18l3,3,3-3"
    />
  </svg>
</template>

<style lang="sass" scoped>
.down-arrow
  fill: none
  stroke: currentcolor
  stroke-linecap: round
  stroke-linejoin: round
  stroke-width: 0.5
  width: 100%
  height: 100%
  margin: 0 0.5rem
  cursor: pointer
  transition: all 0.2s ease-out
  transform: rotate(0deg)

  &:hover
    transform: rotate(360deg)
</style>
