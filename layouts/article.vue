<template>
  <div id="root">
    <!-- <AppHeader>
      <TableOfContents />
    </AppHeader> -->
    <main class="article-main">
      <div class="left">
        <BlogTitle :key="`title-${route.path}`" />
      </div>
      <div class="right">
        <div class="content">
          <div class="content-container">
            <slot id="content" />
          </div>

          <div class="bottom-items">
            <BlogEditButton :key="`actions-${route.path}`" />

            <div class="page-foot-actions">
              <ProseA
                class="archive-link"
                to="/"
                bare
              >
                open the archive
              </ProseA>
              <Surround :key="`surround-${route.path}`" />
            </div>
            <AppFooter identifier="in-page" />
            <SearchButton
              class="search-button"
              @toggle-search="toggleSearch"
            />
          </div>
        </div>
        <SearchBar :open="searchOpen" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

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
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/geometry"
@use "@/styles/mixins"

#root
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center

.article-main
  @include mixins.line-split
  margin-top: 0

.archive-link
  // text-transform: uppercase
  text-transform: lowercase

.article-blog-navigation
  position: sticky
  left: 0
  top: 0

.page-foot-actions
  height: 200px
  width: 100%
  display: inline-flex
  justify-content: space-between
  align-items: center

#root
  display: flex
  //margin: 0 auto
  flex-direction: column
  min-height: 100svh
  //gap: 10px
  position: relative

.article-body
  max-width: 100% !important
  width: calc(100% - 460px)

  @media(max-width: 1200px)
    width: 100%
    max-width: 100vw !important
    margin: 0 !important

description
  font-size: 18px
  font-weight: 500
  line-height: 29px

.article-blog-navigation-footer
  width: 100%
  z-index: 0

  padding: 0 12vw
  margin: 0 auto

  display: none

  @media(max-width: 1200px)
    display: block

.content-container
  font-size: typography.font-size("l")

  // @media screen and (max-width: 720px)
  //   font-size: typography.font-size("m")

</style>
