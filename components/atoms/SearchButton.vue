<template>
  <div
    ref="searchButton"
    class="search-button"
  >
    <StyledMenuButton
      class="search-button"
      @click="toggleSearch"
    />
  </div>
</template>
<script lang="ts" setup>
const searchBackground = ref<HTMLElement>(null);

onMounted(() => {
  searchBackground.value = document.getElementById("site-search-background");
});

const toggleSearch = () => {
  searchBackground.value?.classList.toggle("hidden");
  console.log(`searchBackground.classList: ${searchBackground.value?.classList}`);
};

const searchButton = ref<HTMLElement>(null);

onMounted(() => {
  if (typeof window !== "undefined") {
    const searchBackground = document.querySelector(".blog-title-container");
    const startPosition = searchBackground.getBoundingClientRect().left;
    searchButton.value.style.left = `${startPosition}px`;

    // change on resize!!
    window.addEventListener("resize", () => {
      const searchBackground = document.querySelector(".blog-title-container");
      const startPosition = searchBackground.getBoundingClientRect().left;
      searchButton.value.style.left = `${startPosition}px`;
    });
  }
});

// remove listener before unmount
onUnmounted(() => {
  window.removeEventListener("resize", () => {
    const searchBackground = document.querySelector(".blog-title-container");
    const startPosition = searchBackground.getBoundingClientRect().left;
    searchButton.value.style.left = `${startPosition}px`;
  });
});

</script>

<script lang="ts">
export default {
  name: "SearchButton",
};
</script>

<style lang="sass">
@use "@/styles/colors"
.search-button
  background: colors.color(light-background)
  width: 48px
  height: 48px
  padding: 12px
  border-radius: 50%
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  bottom: 60px
  z-index: 10

  &:active
    background: colors.color(lightest-background)

</style>
