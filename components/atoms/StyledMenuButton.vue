<template>
  <button
    :class="{
      'menu-button': true,
      'clicked': clicked,
    }"
    aria-controls="primary-navigation"
    aria-expanded="false"
    @click="click"
  >
    <svg
      class="menu-icon"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <rect class="line top" />

      <rect class="line bottom" />

    </svg>
  </button>
</template>

<script lang="ts" setup>
const clicked = ref(false)

const click = () => {
  clicked.value = !clicked.value
}

// on mounted, set event listener such that
// on hover, if clicked is true but there's no .clicked class, set clicked to false
onMounted(() => {
  const btn = document.querySelector(".menu-button")
  btn.addEventListener("mouseover", () => {
    if (clicked.value && !btn.classList.contains("clicked")) {
      clicked.value = false
    }
  })
})

// remove listener before unmount
onUnmounted(() => {
  const btn = document.querySelector(".menu-button")
  btn.removeEventListener("mouseover", () => {
    if (clicked.value && !btn.classList.contains("clicked")) {
      clicked.value = false
    }
  })
})
</script>

<style lang="sass" scoped>
@use "@/styles/colors"

.menu-button
  background: transparent
  z-index: 25
  color: colors.color(lightest-foreground)

  .menu-icon
    width: 100%
    height: 100%

  .line
    height: 8px
    fill: currentcolor

    &.top
      width: 80%
      x: 10%
      y: 40%

    &.bottom
      width: 50%
      x: 40%
      y: 60%

    transition: 0.1s
    transform-origin: center

.menu-button
  &:hover
    .top
      width: 50%
      x: 40%

    .bottom
      width: 80%
      x: 10%

  &.clicked
    .top, .bottom
      width: 70%
      x: 15%
      y: 47%

    .top
      transform: rotate(45deg)

    .bottom
      transform: rotate(-45deg)

</style>
