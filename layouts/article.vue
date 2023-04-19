<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <div id="root">
    <AppHeader>
      <TableOfContents />
    </AppHeader>
    <BlogTitle />
    <main class="article-main">
      <div class="body-and-panels">
        <div class="left panel">
          <BlogNavigation class="article-blog-navigation" />
        </div>
        <body class="article-body">
          <div class="content">
            <slot id="content"/>
            <BlogComments id="blog-comments" ref="commentsSection" />
            <AuthenticationForm
              id="auth-form-container"
              class="hidden"
            />
          </div>
        </body>
        <div class="right panel">
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
import { useUserInfo}  from "~/composables/users";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import twitter widgets
// import "https://platform.twitter.com/widgets.js";


const { path: currentPage } = useRoute();
const { toc } = useContent();

const hello = "hello  world";


// reference to comments section for detecting when to show auth popup
const commentsSection = ref<HTMLElement | null>(null);

// auth popup visibility
const authPopUpVisible = ref(false);

// auth section ref
const authSection = ref<HTMLElement | null>(null);

// function to toggle auth popup
const toggleAuthPopup = () => {
  authPopUpVisible.value = !authPopUpVisible.value;
};

onMounted(() => {
  const userInfo = useUserInfo();
  // listen for auth state changes
  const auth = getAuth();
  userInfo.update();
  onAuthStateChanged(auth, (_user) => {
    userInfo.update();
  });
});
</script>


<style lang="sass" scoped>
@use "../styles/default"
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/geometry"
@use "../styles/mixins"

.article-main
  width: min(100%, 1300px)

.article-blog-navigation
  position: sticky
  left: 0

#root
  display: flex
  margin: 0 auto
  flex-direction: column
  min-height: 100vh
  gap: 10px

.body-and-panels
  display: flex
  flex-direction: row
  margin: 0 auto
  gap: 10px

  .panel
    width: 350px
    padding: geometry.var("nav-height") 0
    height: fit-content
    position: sticky
    top: 0
    overflow: hidden

    @media(max-width: 1200px)
      display: none

.content
  margin: 0 auto
  width: min(100%, 80ch)
  font-size: typography.font-size("m")


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
  z-index: 0

  padding: 0 12vw
  margin: 0 auto
  
  display: none

  @media(max-width: 1200px)
    display: block

</style>
