<template>
  <div id="root">
    <AppHeader>
      <TableOfContents />
    </AppHeader>
    <main class="article-main">
      <div class="left">
        <BlogTitle />
      </div>
      <div class="right">
        <div class="content">
          <div class="content-container">
            <slot id="content" />
          </div>
          <div
            class="bottom-items"
          >
            <template v-if="!isMeta">
              <BlogEditButton />
              <InlineFlex class="archive-link">
                <ProseA
                  href="/"
                  fancy
                >
                  archive
                </ProseA>
              </InlineFlex>
              <Surround />
            </template>
            <AppFooter identifier="in-page" />
            <SearchButton class="search-button" />
          </div>
          <BlogComments
            id="blog-comments"
            ref="commentsSection"
          />
          <AuthenticationForm
            id="auth-form-container"
            class="hidden"
          />
        </div>
        <SearchBar />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "@firebase/auth";

// reference to comments section for detecting when to show auth popup
const commentsSection = ref<HTMLElement | null>(null);

const { useMetaPage } = useConfig();
const isMeta = await useMetaPage();

// const {
//   categories,
// } = await queryContent()
//   .where({ _path: path })
//   .only(["category"])
//   .findOne()
//   .then((data) => {
//     return {
//       categories: data.category.filter((category) => category !== "featured"),
//     };
//   });

onMounted(() => {
  const userInfo = useUserInfo();
  // listen for auth state changes
  const auth = getAuth();
  userInfo.init();
  onAuthStateChanged(auth, () => {
    userInfo.init();
  });
});
</script>

<style lang="sass" scoped>
//@use "../styles/default"
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"
@use "../styles/mixins"

.article-main
  @include mixins.line-split

.article-main-ghghgh
  width: min(100%, 1600px)
  position: relative
  display: flex
  flex-direction: row
  color: foreground
  min-height: 100svh

  @media screen and (max-width: 1150px)
    flex-direction: column
    border-left: 1px solid colors.color(light-background)
    margin-left: 1em
    width: min(calc(100% - 1em), 1600px)
    padding-left: 0

  & > *
    padding-left: 15px

  .main-left
    width: clamp(30%, 30svw, 50%)
    border-right: 1px solid colors.color(light-background)
    display: flex
    flex-direction: column
    align-items: flex-end
    flex-grow: 1

    @media screen and (max-width: 1150px)
      width: auto
      border-right: none
      align-items: flex-start
      flex-grow: 0

    .table-of-contents
      width: 85% !important

  .main-right
    margin-right: 1em
    width: min(100%, 75.5ch)
    font-size: typography.font-size("m")
    padding-right: 1em
    //flex-grow: 1
    //height: 100svh
    display: flex
    flex-direction: column
    align-items: space-between
    position: relative

    padding-top: 397px
    @media screen and (max-width: 1150px)
      padding-top: 0

    .content
      width: min(100%, 72ch)
      height: 100%
      font-size: typography.font-size("m")
      height: 100% !important

      flex-grow: 1
      display: flex
      flex-direction: column
      align-items: space-between

      .content-container
        flex-grow: 1
        display: flex
        width: 100%

        & > :deep(div)
          width: 100% !important

        // center text vertically
        align-items: space-between

        &::before
          padding-bottom: 100% // Minimum aspect ratio
          content: ''
          float: left

        &::after
          display: table
          content: ''
          clear: both

.archive-link
  margin-top: auto
  text-transform: uppercase
.article-blog-navigation
  position: sticky
  left: 0
  top: 0

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

</style>
