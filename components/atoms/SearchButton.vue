<template>
  <div
    ref="searchButton"
    class="search-button"
  >
    <StyledMenuButton
      ref="menuButton"
      class="search-button"
      @click="toggleSearch"
    />
  </div>
</template>
<script lang="ts" setup>
const searchBackground = ref<HTMLElement>(null)
const searchButton = ref<HTMLElement>(null)
const buttonContainer = ref<HTMLElement>(null)
const menuButton = ref<HTMLElement>(null)

const emit = defineEmits(["toggle-search"])

onMounted(() => {
  searchBackground.value = document.querySelector("#site-search-background")
  buttonContainer.value = document.querySelector(".blog-title-container")
})

const toggleSearch = () => {
  emit("toggle-search")
}

const adjustButton = () => {
  if (typeof document === "undefined") return

  // if screen maxwidth is less than 1150, align button right
  if (window.innerWidth < 720) {
    searchButton.value.style.right = "20px"
    searchButton.value.style.left = "unset"
  } else if (window.innerWidth < 1150) {
    searchButton.value.style.right = "50px"
    searchButton.value.style.left = "unset"
  } else {
    const startPosition = buttonContainer.value.getBoundingClientRect().left
    searchButton.value.style.right = "unset"
    searchButton.value.style.left = `${startPosition}px`
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    adjustButton()

    // change on resize!!
    window.addEventListener("resize", adjustButton)
  }
})

// remove listener before unmount
onUnmounted(() => {
  window.removeEventListener("resize", adjustButton)
})
</script>

<style lang="sass">
@use "@/styles/colors"
.search-button
  width: 48px
  height: 48px
  padding: 12px
  border-radius: 50%
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  bottom: 50px
  z-index: 11

  border: 1px solid colors.color(lightest-background)

  transition: all 0.3s ease-in-out

  background: rgba(colors.color(light-background), 0.5)

  &:active
    background: rgba(colors.color(light-background), 0.8)

</style>
