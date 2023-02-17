<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <div id="root">
    <AppHeader>
      <TableOfContents />
    </AppHeader>
    <BlogTitle />
    <main>
      <div class="body-and-panels">
        <div class="left-panel">
          <BlogNavigation class="article-blog-navigation" />
        </div>
        <body>
          <div class="content">
            <a class="skip-to-content" href="#content"/>
            <div class="container">
              <div class="content">
                <div>
                  <slot id="content"/>
                  <BlogComments ref="commentsSection" />
                  <AuthenticationForm
                    id="auth-form-container"
                    class="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </body>
        <div class="right-panel">
          <TableOfContents
            class="table-of-contents"
            v-if="currentPage === '/' || (toc && toc.links && toc.links.length > 0)"
            />
        </div>
      </div>
      </main>
    <BlogNavigation class="article-blog-navigation-footer fancy-background" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { path: currentPage } = useRoute();
const { toc } = useContent();

// reference to comments section for detecting when to show auth popup
const commentsSection = ref<HTMLElement | null>(null);

// auth popup visibility
const authPopUpVisible = ref(false);

// auth section ref
const authSection = ref<HTMLElement | null>(null);

// function to toggle auth popup
const toggleAuthPopup = () => {
  authPopUpVisible.value = !authPopUpVisible.value;
  // commentsSection.value.showAuthPopup = authPopUpVisible.value;
};
</script>

<script lang="ts">
// export default {
//   data() {

//   },
//   computed: {
    
//   },
//   watch: {

//   }
// }
</script>

<style lang="sass" scoped>
@use "../styles/default"
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"
// @use "../styles/mixins"

.article-blog-navigation
  position: sticky
  left: 0

  // border-top: 1px solid colors.color("primary-highlight")
  // border-bottom: 1px solid colors.color("primary-highlight")

#root
  display: flex
  margin: 0 auto
  flex-direction: column
  min-height: 100vh
  gap: 2vh
  // max-width: 100vw
  // overflow: hidden

.body-and-panels
  display: flex
  flex-direction: row
  margin: 0 auto
  width: 100%

  .right-panel
    min-width: 240px
    max-width: 240px
    margin-right: 10px
    margin-left: 10px
    padding: geometry.var("nav-height") 0
    height: fit-content
    position: sticky
    top: 0
    overflow: hidden

    @media(max-width: 1200px)
      display: none !important

  .left-panel
    min-width: 240px
    max-width: 240px
    width: 240px
    margin-left: 10px
    margin-right: 10px
    padding: geometry.var("nav-height") 0
    height: fit-content
    position: sticky
    top: 0
    overflow: hidden

    @media(max-width: 1200px)
      display: none
.container
  position: relative
  margin: 0 auto
  padding: 0 1vw
  font-size: typography.font-size("m")
  display: flex
  flex-direction: row
  
  @media(max-width: 1200px)
    padding: 0


  .content
    // width: max(60vw, 75ch)
    width: 100%
    max-width: 85ch
    margin: 0 auto

  // hide side-panel on mobile
  @media (max-width: 1200px)
    
    .content
      width: 100%
      max-width: 85ch


h1
  font-size: 36px
  font-weight: 600
  line-height: 40px

h2
  font-size: 24px
  font-weight: 600
  line-height: 33px

h3
  font-size: 20px
  font-weight: 600
  line-height: 28px

hr
  color: inherit
  margin-left: 0
  margin-right: 0
  margin-top: 1rem
  margin-bottom: 1rem
  // margin: 1rem

.description
  font-size: 18px
  font-weight: 500
  line-height: 29px

.article-blog-navigation-footer
  width: 100%

  padding: 0 12vw
  margin: 0 auto
  
  display: none

  @media(max-width: 1200px)
    display: block

</style>
