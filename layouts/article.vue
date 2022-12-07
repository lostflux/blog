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
  //min-height: 100% !important
  // flex-grow: 1

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
