<template>
  <div id="root">
    <main>
      <slot id="content" />
    </main>
    <AppFooter identifier="in-page" />
  </div>
</template>

<script setup lang="ts">
// reference to comments section for detecting when to show auth popup
// const commentsSection = ref<HTMLElement | null>(null)

const searchOpen = ref(false)
const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
}

// if search is open and "esc" is pressed, close search
onMounted(() => {
  const closeSearch = (e: KeyboardEvent) => {
    if (searchOpen && e.key === "Escape") {
      toggleSearch()

      // find .menu-button and remove .clicked
      const btn = document.querySelector(".menu-button")
      btn.classList.remove("clicked")
    }
  }
  window.addEventListener("keydown", closeSearch)
  return () => {
    window.removeEventListener("keydown", closeSearch)
  }
})
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"

#root
  height: 100svh
  display: flex
  flex-direction: column
  // flex-grow: 1
  justify-content: space-between

main
  margin: 0 auto
  width: min(100svw, 640px)
  margin: auto
  font-weight: 400
  font-size: typography.font-size(s)

</style>
